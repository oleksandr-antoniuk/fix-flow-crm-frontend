'use client';

import { useQuery } from '@apollo/client';
import { SparePartsDocument } from '@/gql/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import { 
  IconPlus, 
  IconSearch, 
  IconEdit, 
  IconBarcode,
  IconPackage
} from '@tabler/icons-react';
import { useState } from 'react';
import DashboardCard from '@/components/shared/DashboardCard';
import CreateSparePartModal from '@/components/inventory/CreateSparePartModal';

export default function InventoryPage() {
  const { data, loading } = useQuery(SparePartsDocument);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<any>(null);

  const filteredParts = data?.spareParts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (part: any) => {
    setSelectedPart(part);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPart(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPart(null);
  };

  return (
    <MainLayout title="Склад та Номенклатура">
      <DashboardCard
        title="Номенклатура товарів"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={20} />}
            onClick={handleCreate}
          >
            Додати товар
          </Button>
        }
      >
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Пошук за назвою, SKU або штрих-кодом..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Назва</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>SKU / Штрих-код</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Виробник</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Роздрібна ціна</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Остання закупівля</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="textSecondary">Завантаження номенклатури...</Typography>
                  </TableCell>
                </TableRow>
              ) : filteredParts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                      <IconPackage size={48} stroke={1.5} style={{ opacity: 0.5 }} />
                      <Typography variant="h6" sx={{ mt: 1 }}>Товарів не знайдено</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredParts?.map((part) => (
                  <TableRow key={part.id} hover>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight={600}>{part.name}</Typography>
                      {part.description && (
                        <Typography variant="body2" color="textSecondary" noWrap sx={{ maxWidth: 300 }}>
                          {part.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        {part.sku && (
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <strong>SKU:</strong> {part.sku}
                          </Typography>
                        )}
                        {part.barcode && (
                          <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconBarcode size={16} /> {part.barcode}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>{part.manufacturer || '-'}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="primary.main" fontWeight={700}>
                        {part.priceRetail} {part.priceRetailCurrency?.symbol}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        {part.lastPricePurchase ? (
                          <>
                            <Typography variant="body2">Ціна: <strong>{part.lastPricePurchase} UAH</strong></Typography>
                            <Typography variant="caption" color="textSecondary">Гар: {part.lastWarranty || '-'}</Typography>
                          </>
                        ) : (
                          <Typography variant="caption" color="textSecondary">Ще не було приходів</Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Редагувати">
                        <IconButton color="primary" onClick={() => handleEdit(part)}>
                          <IconEdit size={20} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>

      <CreateSparePartModal
        open={isModalOpen}
        onClose={handleCloseModal}
        sparePart={selectedPart}
      />
    </MainLayout>
  );
}
