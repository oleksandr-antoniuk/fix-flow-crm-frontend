'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  SuppliersDocument,
  CreateSupplierDocument,
  UpdateSupplierDocument,
  DeleteSupplierDocument,
  CurrenciesDocument,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';

export default function SuppliersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    defaultCurrencyId: '',
  });

  const { data: suppliersData, loading: suppliersLoading, refetch } = useQuery(SuppliersDocument);
  const { data: currenciesData } = useQuery(CurrenciesDocument);

  const [createSupplier, { loading: creating }] = useMutation(CreateSupplierDocument, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  const [updateSupplier, { loading: updating }] = useMutation(UpdateSupplierDocument, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  const [deleteSupplier] = useMutation(DeleteSupplierDocument, {
    onCompleted: () => refetch(),
  });

  const handleOpen = (supplier?: any) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        contactPerson: supplier.contactPerson || '',
        phone: supplier.phone || '',
        email: supplier.email || '',
        address: supplier.address || '',
        defaultCurrencyId: supplier.defaultCurrencyId || '',
      });
    } else {
      setEditingSupplier(null);
      setFormData({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        defaultCurrencyId: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleSubmit = () => {
    if (editingSupplier) {
      updateSupplier({
        variables: {
          id: editingSupplier.id,
          data: formData,
        },
      });
    } else {
      createSupplier({
        variables: {
          data: formData,
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цього постачальника?')) {
      deleteSupplier({ variables: { id } });
    }
  };

  return (
    <MainLayout title="Постачальники">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<IconPlus size={20} />}
          onClick={() => handleOpen()}
        >
          Додати постачальника
        </Button>
      </Box>

      <DashboardCard title="Список постачальників">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Назва</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Контакт</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Email/Телефон</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Валюта</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliersLoading ? (
                <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={24} /></TableCell></TableRow>
              ) : (
                suppliersData?.suppliers.map((supplier) => (
                  <TableRow key={supplier.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>{supplier.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{supplier.address}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{supplier.contactPerson || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{supplier.email || '—'}</Typography>
                      <Typography variant="body2">{supplier.phone || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{supplier.defaultCurrency?.code || '—'}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" onClick={() => handleOpen(supplier)}>
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(supplier.id)}>
                          <IconTrash size={18} />
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
        <DialogTitle>{editingSupplier ? 'Редагувати постачальника' : 'Додати постачальника'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Назва"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Контактна особа"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Stack>
            <TextField
              fullWidth
              label="Адреса"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Валюта за замовчуванням</InputLabel>
              <Select
                label="Валюта за замовчуванням"
                value={formData.defaultCurrencyId}
                onChange={(e) => setFormData({ ...formData, defaultCurrencyId: e.target.value })}
              >
                <MenuItem value="">— Не вибрано —</MenuItem>
                {currenciesData?.currencies.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.code} ({c.name})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Скасувати</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.name || creating || updating}
          >
            {editingSupplier ? 'Зберегти' : 'Створити'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
