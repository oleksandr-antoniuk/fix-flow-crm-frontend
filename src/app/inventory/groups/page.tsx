'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  SparePartGroupsDocument,
  CreateSparePartGroupDocument,
  UpdateSparePartGroupDocument,
  DeleteSparePartGroupDocument,
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
import { IconPlus, IconEdit, IconTrash, IconCategory } from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';

export default function SparePartGroupsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { data, loading, refetch } = useQuery(SparePartGroupsDocument);

  const [createGroup, { loading: creating }] = useMutation(CreateSparePartGroupDocument, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  const [updateGroup, { loading: updating }] = useMutation(UpdateSparePartGroupDocument, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  const [deleteGroup] = useMutation(DeleteSparePartGroupDocument, {
    onCompleted: () => refetch(),
  });

  const handleOpen = (group?: any) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        description: group.description || '',
      });
    } else {
      setEditingGroup(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  const handleSubmit = () => {
    if (editingGroup) {
      updateGroup({
        variables: {
          id: editingGroup.id,
          data: formData,
        },
      });
    } else {
      createGroup({
        variables: {
          data: formData,
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю групу?')) {
      deleteGroup({ variables: { id } });
    }
  };

  return (
    <MainLayout title="Групи товарів">
      <DashboardCard
        title="Список груп товарів"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={20} />}
            onClick={() => handleOpen()}
          >
            Додати групу
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
              ) : data?.sparePartGroups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                      <IconCategory size={48} stroke={1.5} style={{ opacity: 0.5 }} />
                      <Typography variant="h6" sx={{ mt: 1 }}>Груп не знайдено</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                data?.sparePartGroups.map((group: any) => (
                  <TableRow key={group.id} hover>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight={600}>{group.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">{group.description || '-'}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton color="primary" onClick={() => handleOpen(group)}>
                          <IconEdit size={20} />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(group.id)}>
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
        <DialogTitle>{editingGroup ? 'Редагувати групу' : 'Додати нову групу'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Назва групи"
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
