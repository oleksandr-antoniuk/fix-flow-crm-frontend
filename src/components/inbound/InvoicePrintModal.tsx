'use client';

import { useQuery } from '@apollo/client';
import { IncomingInvoiceDocument } from '@/gql/graphql';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import { useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
}

export default function InvoicePrintModal({ isOpen, onClose, invoiceId }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const { data, loading } = useQuery(IncomingInvoiceDocument, {
    variables: { id: invoiceId },
    skip: !isOpen,
  });

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
    if (windowPrint && printContent) {
      windowPrint.document.write('<html><head><title>Друкувати накладну</title>');
      windowPrint.document.write('<style>');
      windowPrint.document.write(`
        body { font-family: sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2 f2 f2; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .total { text-align: right; margin-top: 20px; font-weight: bold; font-size: 1.2em; }
        @media print {
          .no-print { display: none; }
        }
      `);
      windowPrint.document.write('</style></head><body>');
      windowPrint.document.write(printContent.innerHTML);
      windowPrint.document.write('</body></html>');
      windowPrint.document.close();
      windowPrint.focus();
      windowPrint.print();
      windowPrint.close();
    }
  };

  const invoice = data?.incomingInvoice;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Перегляд накладної
        <Button variant="outlined" startIcon={<IconPrinter size={18} />} onClick={handlePrint}>
          Друкувати
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : invoice ? (
          <Box ref={printRef} sx={{ p: 2, bgcolor: '#fff', color: '#000' }}>
            <Box className="header">
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  ПРИХІДНА НАКЛАДНА № {invoice.invoiceNumber}
                </Typography>
                <Typography variant="body1">
                  Дата: {new Date(invoice.dateReceived).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6">{invoice.supplier.name}</Typography>
                <Typography variant="body2">{invoice.supplier.address}</Typography>
                <Typography variant="body2">{invoice.supplier.phone}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="body2"><strong>Покупець:</strong> FIX FLOW CRM Office</Typography>
              <Typography variant="body2"><strong>Опрацював:</strong> {invoice.processedBy.firstname} {invoice.processedBy.lastname}</Typography>
              <Typography variant="body2"><strong>Валюта:</strong> {invoice.currency.code} (Курс: {Number(invoice.exchangeRateSnapshot).toFixed(4)})</Typography>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>#</strong></TableCell>
                    <TableCell><strong>Запчастина / Товар</strong></TableCell>
                    <TableCell><strong>SKU</strong></TableCell>
                    <TableCell align="right"><strong>К-сть</strong></TableCell>
                    <TableCell align="right"><strong>Ціна</strong></TableCell>
                    <TableCell align="right"><strong>Сума</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.sparePart.name}</TableCell>
                      <TableCell>{item.sparePart.sku || '—'}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{Number(item.pricePurchase).toFixed(2)}</TableCell>
                      <TableCell align="right">{(item.quantity * Number(item.pricePurchase)).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box className="total">
              Разом до сплати: {Number(invoice.totalAmount).toFixed(2)} {invoice.currency.symbol}
            </Box>
          </Box>
        ) : (
          <Typography color="error">Не вдалося завантажити дані накладної</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрити</Button>
      </DialogActions>
    </Dialog>
  );
}
