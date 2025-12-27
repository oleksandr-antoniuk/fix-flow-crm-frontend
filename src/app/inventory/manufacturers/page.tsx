'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  ManufacturersDocument,
  CreateManufacturerDocument,
  UpdateManufacturerDocument,
  DeleteManufacturerDocument,
} from '@/gql/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  Paper,
} from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconBuildingFactory2 } from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';

export default function ManufacturersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { data, loading, refetch } = useQuery(ManufacturersDocument);

  const [createManufacturer, { loading: creating }] = useMutation(CreateManufacturerDocument, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  const [updateManufacturer, { loading: updating }] = useMutation(UpdateManufacturerDocument, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  const [deleteManufacturer] = useMutation(DeleteManufacturerDocument, {
    onCompleted: () => refetch(),
  });

  const handleOpen = (manufacturer?: any) => {
    if (manufacturer) {
      setEditingManufacturer(manufacturer);
      setFormData({
        name: manufacturer.name,
        description: manufacturer.description || '',
      });
    } else {
      setEditingManufacturer(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingManufacturer(null);
  };

  const handleSubmit = () => {
    if (editingManufacturer) {
      updateManufacturer({
        variables: {
          id: editingManufacturer.id,
          data: formData,
        },
      });
    } else {
      createManufacturer({
        variables: {
          data: formData,
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього виробника?')) {
      deleteManufacturer({ variables: { id } });
    }
  };

  return (
    <MainLayout title="Виробники">
      <DashboardCard
        title="Список виробників"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={20} />}
            onClick={() => handleOpen()}
          >
            Додати виробника
          </Button>
        }
      >
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Назва</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Опис</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : data?.manufacturers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                      <IconBuildingFactory2 size={48} stroke={1.5} style={{ opacity: 0.5 }} />
                      <Typography variant="h6" sx={{ mt: 1 }}>Виробників не знайдено</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                data?.manufacturers.map((manufacturer: any) => (
                  <TableRow key={manufacturer.id} hover>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight={600}>{manufacturer.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">{manufacturer.description || '-'}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton color="primary" onClick={() => handleOpen(manufacturer)}>
                          <IconEdit size={20} />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(manufacturer.id)}>
                          <IconTrash size={20} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>

      <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingManufacturer ? 'Редагувати виробника' : 'Додати виробника'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Назва виробника"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              label="Опис"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Скасувати</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={creating || updating || !formData.name}
          >
            {(creating || updating) ? <CircularProgress size={24} /> : 'Зберегти'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
