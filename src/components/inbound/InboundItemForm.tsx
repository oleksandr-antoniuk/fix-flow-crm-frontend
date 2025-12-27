'use client';

import { useState } from 'react';
import {
  Stack,
  TextField,
  Autocomplete,
  Typography,
  IconButton,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { IconPlus, IconPackageImport } from '@tabler/icons-react';
import { SparePart } from '@/gql/graphql';
import CreateSparePartModal from '../inventory/CreateSparePartModal';

interface InboundItemFormProps {
  spareParts: SparePart[];
  onAdd: (item: any) => Promise<void>;
}

export function InboundItemForm({ spareParts, onAdd }: InboundItemFormProps) {
  const [isNomenclatureModalOpen, setIsNomenclatureModalOpen] = useState(false);
  const [nomenclatureSearch, setNomenclatureSearch] = useState('');
  
  const [newItem, setNewItem] = useState({
    sparePartId: '',
    quantity: 1,
    pricePurchase: '',
    warranty: '',
    barcode: '',
    serials: [] as string[],
    name: '', // used for UI display
  });

  const [barcodeScan, setBarcodeScan] = useState('');

  const handleScan = (code: string) => {
    const part = spareParts.find((p) => p.sku === code || p.barcode === code);
    if (part) {
      setNewItem({
        ...newItem,
        sparePartId: part.id,
        name: part.name,
        barcode: part.barcode || '',
        pricePurchase: String(part.lastPricePurchase || '0'),
        warranty: part.lastWarranty || '',
      });
      setBarcodeScan('');
    } else {
      // Якщо не знайдено, пропонуємо створити нову номенклатуру
      setNomenclatureSearch(code);
      setIsNomenclatureModalOpen(true);
      setBarcodeScan('');
    }
  };

  const handleAdd = async () => {
    if (!newItem.sparePartId || !newItem.quantity || !newItem.pricePurchase) return;
    
    await onAdd(newItem);
    
    setNewItem({
      sparePartId: '',
      quantity: 1,
      pricePurchase: '',
      warranty: '',
      barcode: '',
      serials: [],
      name: '',
    });
  };

  const handleNomenclatureCreated = (newPart: any) => {
    if (newPart) {
      setNewItem({
        ...newItem,
        sparePartId: newPart.id,
        name: newPart.name,
        barcode: newPart.barcode || '',
        pricePurchase: '0',
        warranty: '',
      });
    }
    setIsNomenclatureModalOpen(false);
  };

  return (
    <Stack spacing={2}>
      {/* Quick scan row */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ bgcolor: 'action.hover', p: 1.5, borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>Швидке додавання (сканер):</Typography>
        <TextField
          size="small"
          placeholder="Відскануйте штрих-код або SKU..."
          value={barcodeScan}
          onChange={(e) => setBarcodeScan(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleScan(barcodeScan);
            }
          }}
          sx={{ width: 400, bgcolor: 'background.paper' }}
          autoFocus
        />
      </Stack>

      {/* Main input fields */}
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              fullWidth
              size="small"
              options={spareParts}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option.barcode ? `${option.name} [${option.barcode}]` : option.name;
              }}
              value={spareParts.find(p => p.id === newItem.sparePartId) || null}
              renderInput={(params) => <TextField {...params} label="Назва запчастини" />}
              onChange={(_, value) => {
                if (value) {
                  setNewItem({ 
                    ...newItem, 
                    sparePartId: value.id, 
                    name: value.name, 
                    barcode: value.barcode || '',
                    pricePurchase: String(value.lastPricePurchase || '0'),
                    warranty: value.lastWarranty || '',
                  });
                } else {
                  setNewItem({ ...newItem, sparePartId: '', name: '', barcode: '', pricePurchase: '', warranty: '' });
                }
              }}
              noOptionsText={
                <Button 
                  fullWidth 
                  color="primary" 
                  startIcon={<IconPlus size={16} />}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsNomenclatureModalOpen(true);
                  }}
                >
                  Створити нову номенклатуру
                </Button>
              }
            />
            <IconButton color="primary" onClick={() => setIsNomenclatureModalOpen(true)} title="Створити нову номенклатуру">
              <IconPackageImport size={20} />
            </IconButton>
          </Stack>
        </Grid>

        <CreateSparePartModal 
          open={isNomenclatureModalOpen} 
          onClose={handleNomenclatureCreated}
          initialBarcode={nomenclatureSearch}
        />

        <Grid size={{ xs: 6, md: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            label="К-сть"
            type="number"
            value={newItem.quantity}
            onChange={(e) => {
              const qty = parseInt(e.target.value) || 1;
              setNewItem({
                ...newItem,
                quantity: qty,
                serials: Array(qty).fill(''),
              });
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Ціна зак."
            placeholder="0.00"
            value={newItem.pricePurchase}
            onChange={(e) => setNewItem({ ...newItem, pricePurchase: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Гарантія"
            placeholder="12 міс."
            value={newItem.warranty}
            onChange={(e) => setNewItem({ ...newItem, warranty: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 1.5 }}>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="textSecondary">Сума:</Typography>
            <Typography variant="subtitle1" fontWeight={700} color="primary.main">
              {(Number(newItem.pricePurchase) * newItem.quantity).toFixed(2)}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 1 }} sx={{ display: 'flex', justifyContent: 'flex-end', pt: '8px !important' }}>
          <IconButton color="primary" onClick={handleAdd} size="large" sx={{ bgcolor: 'primary.light' }}>
            <IconPlus size={24} />
          </IconButton>
        </Grid>
      </Grid>

      {/* Serials Input Area */}
      {newItem.quantity > 0 && newItem.sparePartId && (
        <Box sx={{ p: 2, bgcolor: '#f8f9fa', border: '1px dashed #dee2e6', borderRadius: 1 }}>
          <Typography variant="caption" fontWeight={600} gutterBottom display="block" sx={{ mb: 1, color: 'text.secondary' }}>
            Серійні номери (через Enter або сканер):
          </Typography>
          <Grid container spacing={1}>
            {Array.from({ length: newItem.quantity }).map((_, i) => (
              <Grid size="auto" key={i}>
                <TextField
                  size="small"
                  placeholder={`SN ${i + 1}`}
                  sx={{ width: 160, bgcolor: 'background.paper' }}
                  value={newItem.serials[i] || ''}
                  onChange={(e) => {
                    const newSerials = [...newItem.serials];
                    newSerials[i] = e.target.value;
                    setNewItem({ ...newItem, serials: newSerials });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const inputs = document.querySelectorAll('input[placeholder^="SN"]');
                      const next = inputs[i + 1] as HTMLInputElement;
                      if (next) next.focus();
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Stack>
  );
}
