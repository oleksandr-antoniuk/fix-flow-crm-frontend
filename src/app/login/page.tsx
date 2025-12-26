'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LoginDocument } from '@/gql/graphql';
import {
  Box,
  Typography,
  FormLabel,
  Button,
  Stack,
  Alert,
  Card,
  Container,
} from '@mui/material';
import CustomTextField from '@/components/shared/CustomTextField';
import { IconTools } from '@tabler/icons-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { loading }] = useMutation(LoginDocument, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.accessToken);
      window.location.href = '/';
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    login({ variables: { data: { email, password } } });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Container maxWidth="xs">
        <Stack
          spacing={0}
          justifyContent="center"
          sx={{ height: '100vh' }}
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" mb={3} gap={1}>
              <IconTools size={40} color="#5D87FF" />
              <Typography variant="h3" fontWeight={700}>
                Fix Flow
              </Typography>
            </Box>

            <Typography
              color="textSecondary"
              textAlign="center"
              variant="subtitle2"
              fontWeight="400"
              mb={3}
            >
              Вхід у вашу CRM
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box>
                  <FormLabel htmlFor="email" sx={{ fontWeight: 600, color: 'text.primary', mb: 1, display: 'block' }}>Email</FormLabel>
                  <CustomTextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="password" sx={{ fontWeight: 600, color: 'text.primary', mb: 1, display: 'block' }}>Пароль</FormLabel>
                  <CustomTextField
                    id="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Вхід...' : 'Увійти'}
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
