import { ApolloClient, InMemoryCache, HttpLink, from, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql',
  credentials: 'include', // Enable cookies
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      // Check for UNAUTHENTICATED code (standard for Apollo Server/NestJS)
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        
        // Avoid infinite loop if RefreshToken itself fails
        if (operation.operationName === 'RefreshToken') {
           return;
        }

        return new Observable(observer => {
          // Call refresh token mutation using fetch to bypass Apollo links
          fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies (refreshToken)
            body: JSON.stringify({
              query: `mutation RefreshToken { refreshToken { accessToken } }`
            }),
          })
          .then(response => response.json())
          .then(data => {
            const newToken = data.data?.refreshToken?.accessToken;
            
            if (newToken) {
              // Save new token
              localStorage.setItem('token', newToken);
              
              // Update the authorization header for the retried request
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newToken}`,
                },
              });

              // Retry the request
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              
              forward(operation).subscribe(subscriber);
            } else {
              // Refresh failed - logout user
              localStorage.removeItem('token');
              window.location.href = '/login';
              observer.error(err);
            }
          })
          .catch(error => {
             // Network error during refresh
             localStorage.removeItem('token');
             window.location.href = '/login';
             observer.error(error);
          });
        });
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
