'use client';

import { useQuery, useMutation } from '@apollo/client';
import { ServicesDocument, CreateServiceDocument, DeleteServiceDocument } from '@/gql/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
} from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import DashboardCard from '@/components/shared/DashboardCard';

export default function ServicesPage() {
  const { data, loading, refetch } = useQuery(ServicesDocument);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCost, setNewCost] = useState('');
  const [error, setError] = useState('');

  const [createService] = useMutation(CreateServiceDocument, {
    onCompleted: () => {
      setIsModalOpen(false);
      setNewName('');
      setNewDescription('');
      setNewCost('');
      refetch();
    },
    onError: (err) => setError(err.message),
  });

  const [deleteService] = useMutation(DeleteServiceDocument, {
    onCompleted: () => refetch(),
    onError: (err) => alert(err.message),
  });

  const handleCreate = () => {
    setError('');
    if (!newName) return;
    createService({
      variables: {
        data: {
          name: newName,
          description: newDescription,
          cost: newCost,
        },
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю послугу?')) {
      deleteService({ variables: { id } });
    }
  };

  return (
    <MainLayout title="Послуги">
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<IconPlus size="18" />}
          onClick={() => setIsModalOpen(true)}
        >
          Додати послугу
        </Button>
      </Box>

      <DashboardCard>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Назва</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Опис</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Вартість</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 10 }}>Завантаження...</TableCell>
                </TableRow>
              ) : data?.services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 10 }}>Послуг не знайдено</TableCell>
                </TableRow>
              ) : (
                data?.services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>{service.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2">{service.description || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{service.cost ? `${service.cost} ₴` : '—'}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="error" onClick={() => handleDelete(service.id)}>
                        <IconTrash size="18" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Нова послуга</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Назва *"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              label="Опис"
              fullWidth
              multiline
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <TextField
              label="Вартість (₴)"
              fullWidth
              type="number"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsModalOpen(false)}>Скасувати</Button>
          <Button variant="contained" onClick={handleCreate}>Зберегти</Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
