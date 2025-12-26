'use client';

import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from '@/lib/apollo-client';
import { queryClient } from '@/lib/query-client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CustomizerProvider } from '@/context/CustomizerContext';
import { ThemeSettings } from '@/theme/Theme';

function ThemeApp({ children }: { children: ReactNode }) {
  const theme = ThemeSettings();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <CustomizerProvider>
          <ThemeApp>
            {children}
          </ThemeApp>
        </CustomizerProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
