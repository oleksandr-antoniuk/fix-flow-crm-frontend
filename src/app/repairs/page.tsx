'use client';

import { useQuery } from '@apollo/client';
import { RepairOrdersDocument } from '@/gql/graphql';
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
  Paper,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
} from '@mui/material';
import { IconPlus, IconSearch, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import { AcceptRepairModal } from '@/components/repairs/accept-repair-modal';
import DashboardCard from '@/components/shared/DashboardCard';

export default function RepairsPage() {
  const { data, loading } = useQuery(RepairOrdersDocument);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = data?.repairOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client?.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.assignedMaster.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.assignedMaster.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Ремонти">
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          placeholder="Пошук ремонтів..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="18" />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          startIcon={<IconPlus size="18" />}
          onClick={() => setIsModalOpen(true)}
        >
          Прийняти в ремонт
        </Button>
      </Box>

      <AcceptRepairModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <DashboardCard>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Дата</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Пристрій</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Клієнт</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Майстер</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Статус</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    Завантаження...
                  </TableCell>
                </TableRow>
              ) : filteredOrders?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    <Typography color="textSecondary">Ремонтів не знайдено</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders?.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {order.deviceName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2">
                        {order.client ? `${order.client.firstname} ${order.client.lastname}` : '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2">
                        {order.assignedMaster.firstname} {order.assignedMaster.lastname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                           bgcolor: 
                             order.status === 'PENDING' ? 'warning.light' :
                             order.status === 'IN_PROGRESS' ? 'primary.light' :
                             order.status === 'COMPLETED' ? 'success.light' : 'grey.100',
                           color:
                             order.status === 'PENDING' ? 'warning.main' :
                             order.status === 'IN_PROGRESS' ? 'primary.main' :
                             order.status === 'COMPLETED' ? 'success.main' : 'grey.600',
                           fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                       <IconButton size="small">
                          <IconEye size="18" />
                       </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </MainLayout>
  );
}
