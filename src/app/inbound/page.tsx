'use client';

import {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {
    CreateIncomingInvoiceDocument,
    CreateSparePartDocument,
    CurrenciesDocument,
    IncomingInvoicesDocument,
    SparePartsDocument,
    SuppliersDocument,
} from '@/gql/graphql';
import {MainLayout} from '@/components/layout/main-layout';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {IconBarcode, IconEye, IconFilePlus, IconHash, IconPrinter, IconTrash} from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';
import InvoicePrintModal from '@/components/inbound/InvoicePrintModal';
import {InboundItemForm} from '@/components/inbound/InboundItemForm';

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
      barcode?: string;
      warranty?: string;
      serials?: string[];
    }[],
  });

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

  const handleAddItem = async (item: any) => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          sparePartId: item.sparePartId,
          quantity: item.quantity,
          pricePurchase: item.pricePurchase,
          name: item.name,
          barcode: item.barcode,
          warranty: item.warranty,
          serials: item.serials,
        },
      ],
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
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} maxWidth={false} fullWidth>
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

            <Typography variant="h6">Товари</Typography>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
              <TableContainer sx={{ flexGrow: 1, overflow: 'auto', border: '1px solid #eee', borderRadius: 1, maxHeight: '500px' }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Запчастина</TableCell>
                      <TableCell>Штрих-код</TableCell>
                      <TableCell>Серійні номери</TableCell>
                      <TableCell width={80}>К-сть</TableCell>
                      <TableCell width={120}>Ціна зак.</TableCell>
                      <TableCell width={120}>Сума</TableCell>
                      <TableCell width={120}>Гарантія</TableCell>
                      <TableCell width={50}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.items.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {item.barcode && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <IconBarcode size={16} color="gray" />
                              <Typography variant="body2">
                                {item.barcode}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.serials && item.serials.length > 0 && (
                            <Tooltip title={item.serials.join(', ')}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <IconHash size={16} color="gray" />
                                <Typography variant="body2">
                                  {item.serials.length} од.
                                </Typography>
                              </Box>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.pricePurchase}</TableCell>
                        <TableCell>{(Number(item.pricePurchase) * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>{item.warranty || '-'}</TableCell>
                        <TableCell>
                          <IconButton size="small" color="error" onClick={() => handleRemoveItem(index)}>
                            <IconTrash size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {formData.items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                          <Typography color="textSecondary">Додайте товари до накладної</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fcfcfc' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Додати нову позицію:</Typography>
                <InboundItemForm spareParts={(sparePartsData?.spareParts as any) || []} onAdd={handleAddItem} />
              </Box>
            </Box>
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
