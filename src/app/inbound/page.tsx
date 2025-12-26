'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  IncomingInvoicesDocument,
  SuppliersDocument,
  CurrenciesDocument,
  SparePartsDocument,
  CreateIncomingInvoiceDocument,
  CreateSparePartDocument,
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
  Autocomplete,
} from '@mui/material';
import { IconPlus, IconEye, IconPrinter, IconTrash, IconFilePlus } from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';
import InvoicePrintModal from '@/components/inbound/InvoicePrintModal';

export default function InboundPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    supplierInvoiceNumber: '',
    dateReceived: new Date().toISOString().split('T')[0],
    supplierId: '',
    currencyId: '',
    items: [] as { 
      sparePartId: string; 
      quantity: number; 
      pricePurchase: string; 
      name?: string;
      warranty?: string;
      serials?: string[];
    }[],
  });

  const [newItem, setNewItem] = useState({
    sparePartId: '',
    quantity: 1,
    pricePurchase: '',
    warranty: '',
    serials: [] as string[],
  });

  const [barcodeScan, setBarcodeScan] = useState('');

  const { data: invoicesData, loading: invoicesLoading, refetch } = useQuery(IncomingInvoicesDocument);
  const { data: suppliersData } = useQuery(SuppliersDocument);
  const { data: currenciesData } = useQuery(CurrenciesDocument);
  const [createSparePart] = useMutation(CreateSparePartDocument, {
    onCompleted: () => refetchSpareParts(),
  });

  const { data: sparePartsData, refetch: refetchSpareParts } = useQuery(SparePartsDocument);

  const [createInvoice, { loading: creating }] = useMutation(CreateIncomingInvoiceDocument, {
    onCompleted: () => {
      refetch();
      setIsCreateModalOpen(false);
      setFormData({
        invoiceNumber: '',
        supplierInvoiceNumber: '',
        dateReceived: new Date().toISOString().split('T')[0],
        supplierId: '',
        currencyId: '',
        items: [],
      });
    },
  });

  const handleAddItem = () => {
    if (!newItem.sparePartId || !newItem.quantity || !newItem.pricePurchase) return;
    
    const part = sparePartsData?.spareParts.find(p => p.id === newItem.sparePartId);
    
    setFormData({
      ...formData,
      items: [...formData.items, { ...newItem, name: part?.name }],
    });
    setNewItem({ 
      sparePartId: '', 
      quantity: 1, 
      pricePurchase: '',
      warranty: '',
      serials: []
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handlePrint = (id: string) => {
    setSelectedInvoiceId(id);
    setIsPrintModalOpen(true);
  };

  const handleSubmit = () => {
    createInvoice({
      variables: {
        data: {
          invoiceNumber: formData.invoiceNumber || undefined,
          supplierInvoiceNumber: formData.supplierInvoiceNumber || undefined,
          dateReceived: new Date(formData.dateReceived),
          supplierId: formData.supplierId,
          currencyId: formData.currencyId,
          items: formData.items.map(i => ({
            sparePartId: i.sparePartId,
            quantity: i.quantity,
            pricePurchase: i.pricePurchase,
            warranty: i.warranty || undefined,
            serials: i.serials && i.serials.length > 0 ? i.serials : undefined,
          })),
        },
      },
    });
  };

  return (
    <MainLayout title="Прихід товару">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<IconFilePlus size={20} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Нова накладна
        </Button>
      </Box>

      <DashboardCard title="Прихідні накладні">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>№ Накладної (внутр.)</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>№ Постачальника</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Дата</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Постачальник</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Сума</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Опрацював</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoicesLoading ? (
                <TableRow><TableCell colSpan={7} align="center"><CircularProgress size={24} /></TableCell></TableRow>
              ) : (
                invoicesData?.incomingInvoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>{invoice.invoiceNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.supplierInvoiceNumber || '-'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{new Date(invoice.dateReceived).toLocaleDateString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.supplier.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary.main" fontWeight={700}>
                        {Number(invoice.totalAmount).toFixed(2)} {invoice.currency.symbol}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{invoice.processedBy.firstname} {invoice.processedBy.lastname}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" color="primary" onClick={() => handlePrint(invoice.id)}>
                          <IconPrinter size={18} />
                        </IconButton>
                        <IconButton size="small">
                          <IconEye size={18} />
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

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Нова прихідна накладна</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Номер накладної (внутр.)"
                placeholder="Автоматично"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              />
              <TextField
                fullWidth
                label="Номер накладної постачальника"
                value={formData.supplierInvoiceNumber}
                onChange={(e) => setFormData({ ...formData, supplierInvoiceNumber: e.target.value })}
              />
              <TextField
                fullWidth
                type="date"
                label="Дата приходу"
                InputLabelProps={{ shrink: true }}
                value={formData.dateReceived}
                onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Постачальник</InputLabel>
                <Select
                  label="Постачальник"
                  value={formData.supplierId}
                  onChange={(e) => {
                    const sup = suppliersData?.suppliers.find(s => s.id === e.target.value);
                    setFormData({ 
                      ...formData, 
                      supplierId: e.target.value as string,
                      currencyId: sup?.defaultCurrencyId || formData.currencyId
                    });
                  }}
                >
                  {suppliersData?.suppliers.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Валюта накладної</InputLabel>
                <Select
                  label="Валюта накладної"
                  value={formData.currencyId}
                  onChange={(e) => setFormData({ ...formData, currencyId: e.target.value as string })}
                >
                  {currenciesData?.currencies.map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.code} ({c.name})</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6">Товари</Typography>
              <TextField
                size="small"
                label="Сканувати штрих-код (SKU)"
                value={barcodeScan}
                onChange={(e) => setBarcodeScan(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const part = sparePartsData?.spareParts.find(p => p.sku === barcodeScan);
                    if (part) {
                      setFormData({
                        ...formData,
                        items: [...formData.items, { 
                          sparePartId: part.id, 
                          quantity: 1, 
                          pricePurchase: String(part.priceRetail || '0'), 
                          name: part.name 
                        }],
                      });
                      setBarcodeScan('');
                    } else {
                      alert('Запчастину з таким SKU не знайдено');
                    }
                  }
                }}
              />
            </Stack>
            <TableContainer sx={{ border: '1px solid #eee', borderRadius: 1 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f9f9f9' }}>
                  <TableRow>
                    <TableCell>Запчастина</TableCell>
                    <TableCell width={80}>К-сть</TableCell>
                    <TableCell width={120}>Ціна зак.</TableCell>
                    <TableCell width={120}>Сума</TableCell>
                    <TableCell width={120}>Гарантія</TableCell>
                    <TableCell width={50}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{item.name}</Typography>
                        {item.serials && item.serials.length > 0 && (
                          <Typography variant="caption" color="textSecondary" display="block">
                            SN: {item.serials.join(', ')}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.pricePurchase}</TableCell>
                      <TableCell>{(Number(item.pricePurchase) * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>{item.warranty || '-'}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="error" onClick={() => handleRemoveItem(index)}>
                          <IconTrash size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Autocomplete
                        size="small"
                        options={sparePartsData?.spareParts || []}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                        renderInput={(params) => <TextField {...params} label="Назва запчастини" />}
                        freeSolo
                        onInputChange={(_, value) => {
                           const part = sparePartsData?.spareParts.find(p => p.name === value);
                           if (part) {
                             setNewItem({ ...newItem, sparePartId: part.id });
                           } else {
                             // This is a new part name
                             setNewItem({ ...newItem, sparePartId: 'NEW', name: value } as any);
                           }
                        }}
                        onChange={(_, value) => {
                          if (typeof value === 'string') {
                            setNewItem({ ...newItem, sparePartId: 'NEW', name: value } as any);
                          } else {
                            setNewItem({ ...newItem, sparePartId: value?.id || '' });
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value) || 1;
                          setNewItem({ 
                            ...newItem, 
                            quantity: qty,
                            serials: Array(qty).fill('') 
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="0.00"
                        value={newItem.pricePurchase}
                        onChange={(e) => setNewItem({ ...newItem, pricePurchase: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {(Number(newItem.pricePurchase) * newItem.quantity).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="12 міс."
                        value={newItem.warranty}
                        onChange={(e) => setNewItem({ ...newItem, warranty: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={async () => {
                        let sparePartId = newItem.sparePartId;
                        let partName = sparePartsData?.spareParts.find(p => p.id === sparePartId)?.name;

                        if (sparePartId === 'NEW') {
                          // Create new spare part first
                          const { data } = await createSparePart({
                            variables: { data: { name: (newItem as any).name } }
                          });
                          sparePartId = data.createSparePart.id;
                          partName = data.createSparePart.name;
                        }

                        if (!sparePartId) return;

                        setFormData({
                          ...formData,
                          items: [...formData.items, { 
                            sparePartId, 
                            quantity: newItem.quantity, 
                            pricePurchase: newItem.pricePurchase,
                            name: partName,
                            warranty: newItem.warranty,
                            serials: newItem.serials
                          }],
                        });
                        setNewItem({ 
                          sparePartId: '', 
                          quantity: 1, 
                          pricePurchase: '', 
                          warranty: '',
                          serials: []
                        });
                      }}>
                        <IconPlus size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {/* Serials Input Row */}
                  {newItem.quantity > 0 && newItem.sparePartId && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ p: 2, bgcolor: '#fcfcfc' }}>
                         <Typography variant="caption" fontWeight={600} gutterBottom display="block">
                           Серійні номери (через Enter або сканер):
                         </Typography>
                         <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                           {Array.from({ length: newItem.quantity }).map((_, i) => (
                             <TextField
                               key={i}
                               size="small"
                               placeholder={`SN ${i + 1}`}
                               sx={{ width: 150 }}
                               value={newItem.serials[i] || ''}
                               onChange={(e) => {
                                 const newSerials = [...newItem.serials];
                                 newSerials[i] = e.target.value;
                                 setNewItem({ ...newItem, serials: newSerials });
                               }}
                               onKeyDown={(e) => {
                                 if (e.key === 'Enter') {
                                   e.preventDefault();
                                   // Focus next serial or add button
                                   const inputs = document.querySelectorAll('input[placeholder^="SN"]');
                                   const next = inputs[i+1] as HTMLInputElement;
                                   if (next) next.focus();
                                 }
                               }}
                             />
                           ))}
                         </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateModalOpen(false)}>Скасувати</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.supplierId || !formData.currencyId || formData.items.length === 0 || creating}
          >
            Зберегти накладну
          </Button>
        </DialogActions>
      </Dialog>

      {selectedInvoiceId && (
        <InvoicePrintModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          invoiceId={selectedInvoiceId}
        />
      )}
    </MainLayout>
  );
}
