'use client';

import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {
    CreateSparePartDocument,
    CurrenciesDocument,
    ManufacturersDocument,
    SparePartGroupsDocument,
    SparePartsDocument,
    UpdateSparePartDocument,
} from '@/gql/graphql';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {IconPhoto} from '@tabler/icons-react';

interface CreateSparePartModalProps {
  open: boolean;
  onClose: (newPart?: any) => void;
  sparePart?: any; // If provided, we are in edit mode
  initialName?: string;
  initialBarcode?: string;
}

export default function CreateSparePartModal({ 
  open, 
  onClose, 
  sparePart,
  initialName = '', 
  initialBarcode = '' 
}: CreateSparePartModalProps) {
  const [formData, setFormData] = useState({
    name: initialName,
    sku: '',
    barcode: initialBarcode,
    manufacturer: '',
    manufacturerId: '',
    groupId: '',
    description: '',
    imageUrl: '',
    priceRetail: '',
    priceRetailCurrencyId: '',
    priceCustom1: '',
    priceCustom2: '',
    lastPricePurchase: '',
    lastWarranty: '',
  });

  const { data: currenciesData } = useQuery(CurrenciesDocument);
  const { data: groupsData } = useQuery(SparePartGroupsDocument);
  const { data: manufacturersData } = useQuery(ManufacturersDocument);

  useEffect(() => {
    if (sparePart) {
      setFormData({
        name: sparePart.name || '',
        sku: sparePart.sku || '',
        barcode: sparePart.barcode || '',
        manufacturer: sparePart.manufacturer || '',
        manufacturerId: sparePart.manufacturerId || '',
        groupId: sparePart.groupId || '',
        description: sparePart.description || '',
        imageUrl: sparePart.imageUrl || '',
        priceRetail: sparePart.priceRetail?.toString() || '',
        priceRetailCurrencyId: sparePart.priceRetailCurrency?.id || '',
        priceCustom1: sparePart.priceCustom1?.toString() || '',
        priceCustom2: sparePart.priceCustom2?.toString() || '',
        lastPricePurchase: sparePart.lastPricePurchase?.toString() || '',
        lastWarranty: sparePart.lastWarranty || '',
      });
    } else {
      setFormData({
        name: initialName,
        sku: '',
        barcode: initialBarcode,
        manufacturer: '',
        manufacturerId: '',
        groupId: '',
        description: '',
        imageUrl: '',
        priceRetail: '',
        priceRetailCurrencyId: currenciesData?.currencies.find((c: any) => c.isRetailDefault)?.id || '',
        priceCustom1: '',
        priceCustom2: '',
        lastPricePurchase: '',
        lastWarranty: '',
      });
    }
  }, [sparePart, open, initialName, initialBarcode, currenciesData]);

  const [createPart, { loading: creating }] = useMutation(CreateSparePartDocument, {
    refetchQueries: [{ query: SparePartsDocument }],
  });

  const [updatePart, { loading: updating }] = useMutation(UpdateSparePartDocument, {
    refetchQueries: [{ query: SparePartsDocument }],
  });

  const loading = creating || updating;

  const handleSubmit = async () => {
    if (!formData.name) return;

    const dataToSend = {
      ...formData,
      priceRetail: formData.priceRetail ? formData.priceRetail : null,
      priceRetailCurrencyId: formData.priceRetailCurrencyId || null,
      manufacturerId: formData.manufacturerId || null,
      groupId: formData.groupId || null,
      lastPricePurchase: formData.lastPricePurchase || null,
      lastWarranty: formData.lastWarranty || null,
    };

    if (sparePart) {
      const res = await updatePart({
        variables: {
          id: sparePart.id,
          data: {
            ...dataToSend,
            priceRetail: dataToSend.priceRetail ? dataToSend.priceRetail.toString() : null,
            priceCustom1: dataToSend.priceCustom1 ? dataToSend.priceCustom1.toString() : null,
            priceCustom2: dataToSend.priceCustom2 ? dataToSend.priceCustom2.toString() : null,
            lastPricePurchase: dataToSend.lastPricePurchase ? dataToSend.lastPricePurchase.toString() : null,
          }
        }
      });
      if (res.data?.updateSparePart) {
        onClose(res.data.updateSparePart);
      }
    } else {
      const res = await createPart({
        variables: {
          data: {
            ...dataToSend,
            priceRetail: dataToSend.priceRetail ? dataToSend.priceRetail.toString() : null,
            priceCustom1: dataToSend.priceCustom1 ? dataToSend.priceCustom1.toString() : null,
            priceCustom2: dataToSend.priceCustom2 ? dataToSend.priceCustom2.toString() : null,
            lastPricePurchase: dataToSend.lastPricePurchase ? dataToSend.lastPricePurchase.toString() : null,
          }
        }
      });
      if (res.data?.createSparePart) {
        onClose(res.data.createSparePart);
      }
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="lg" fullWidth>
      <DialogTitle>{sparePart ? 'Редагувати номенклатуру' : 'Додати нову номенклатуру'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Left Column: Image and Basic Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  aspectRatio: '1/1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'grey.50',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                ) : (
                  <Stack alignItems="center" spacing={1} color="text.secondary">
                    <IconPhoto size={48} />
                    <Typography variant="caption">Немає зображення</Typography>
                  </Stack>
                )}
              </Paper>
              <TextField
                fullWidth
                label="URL зображення"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </Stack>
          </Grid>

          {/* Right Column: All other fields */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Назва товару *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="Артикул (SKU)"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="Штрих-код виробника"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Група товару</InputLabel>
                    <Select
                      label="Група товару"
                      value={formData.groupId}
                      onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                    >
                      <MenuItem value="">
                        <em>Не вибрано</em>
                      </MenuItem>
                      {groupsData?.sparePartGroups.map((group: any) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Виробник (бренд)</InputLabel>
                    <Select
                      label="Виробник (бренд)"
                      value={formData.manufacturerId}
                      onChange={(e) => setFormData({ ...formData, manufacturerId: e.target.value })}
                    >
                      <MenuItem value="">
                        <em>Не вибрано</em>
                      </MenuItem>
                      {manufacturersData?.manufacturers.map((brand: any) => (
                        <MenuItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" fontWeight={600} color="textSecondary">Ціноутворення (в базі)</Typography>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 3 }}>
                  <TextField
                    fullWidth
                    label="Ціна закупівлі"
                    type="number"
                    value={formData.lastPricePurchase}
                    onChange={(e) => setFormData({ ...formData, lastPricePurchase: e.target.value })}
                    helperText="Для авто-розрахунку"
                  />
                </Grid>
                <Grid size={{ xs: 3 }}>
                  <TextField
                    fullWidth
                    label="Роздрібна ціна"
                    type="number"
                    value={formData.priceRetail}
                    onChange={(e) => setFormData({ ...formData, priceRetail: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 3 }}>
                  <TextField
                    fullWidth
                    label="Ціна 1 (партнер)"
                    type="number"
                    value={formData.priceCustom1}
                    onChange={(e) => setFormData({ ...formData, priceCustom1: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 3 }}>
                  <TextField
                    fullWidth
                    label="Ціна 2 (спец)"
                    type="number"
                    value={formData.priceCustom2}
                    onChange={(e) => setFormData({ ...formData, priceCustom2: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Валюта розрахунку цін</InputLabel>
                    <Select
                      value={formData.priceRetailCurrencyId}
                      label="Валюта розрахунку цін"
                      onChange={(e) => setFormData({ ...formData, priceRetailCurrencyId: e.target.value })}
                    >
                      {currenciesData?.currencies.map((curr: any) => (
                        <MenuItem key={curr.id} value={curr.id}>
                          {curr.code} ({curr.symbol}) {curr.isRetailDefault && '- Базова'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="Гарантія (остання)"
                    placeholder="12 місяців"
                    value={formData.lastWarranty}
                    onChange={(e) => setFormData({ ...formData, lastWarranty: e.target.value })}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Опис"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => onClose()}>Скасувати</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.name || loading}
        >
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
