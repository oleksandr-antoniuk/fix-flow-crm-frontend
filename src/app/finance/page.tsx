'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  CurrenciesDocument, 
  ExchangeRatesDocument, 
  SyncNbuRatesDocument,
  CreateCurrencyDocument,
  EnsureDefaultCurrenciesDocument,
  SupportedCurrenciesDocument
} from '@/gql/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import {
  Typography,
  Box,
  Grid,
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
  FormControlLabel,
  Switch,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from '@mui/material';
import { IconPlus, IconRefresh, IconTrendingUp } from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';

export default function FinancePage() {
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [newCurrency, setNewCurrency] = useState({
    code: '',
    name: '',
    symbol: '',
    isRetailDefault: false,
  });

  const { data: currenciesData, loading: currenciesLoading, refetch: refetchCurrencies } = useQuery(CurrenciesDocument);
  const { data: supportedCurrenciesData } = useQuery(SupportedCurrenciesDocument);
  const { data: ratesData, loading: ratesLoading, refetch: refetchRates } = useQuery(ExchangeRatesDocument, {
    variables: { take: 10 }
  });

  const [syncRates, { loading: syncing }] = useMutation(SyncNbuRatesDocument, {
    onCompleted: () => {
      refetchRates();
      refetchCurrencies();
    },
  });

  const [createCurrency, { loading: creating }] = useMutation(CreateCurrencyDocument, {
    onCompleted: () => {
      refetchCurrencies();
      setIsCurrencyModalOpen(false);
      setNewCurrency({ code: '', name: '', symbol: '', isRetailDefault: false });
    },
  });

  const [ensureDefaults, { loading: ensuring }] = useMutation(EnsureDefaultCurrenciesDocument, {
    onCompleted: () => refetchCurrencies(),
  });

  const handleCreateCurrency = () => {
    if (!newCurrency.code) return;
    createCurrency({ variables: { data: newCurrency } });
  };

  return (
    <MainLayout title="Фінанси">
      {/* Current Rates Labels */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconTrendingUp size={24} /> Поточні курси (НБУ)
        </Typography>
        <Grid container spacing={3}>
          {currenciesLoading ? (
             <Grid size={{ xs: 12 }}><CircularProgress size={24} /></Grid>
          ) : (
            currenciesData?.currencies.filter(c => !c.isRetailDefault).map((currency) => (
              <Grid key={currency.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card variant="outlined" sx={{ bgcolor: 'primary.light', border: 'none' }}>
                  <CardContent sx={{ pb: '16px !important' }}>
                    <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
                      {currency.code} / UAH
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                      {currency.latestRate?.rate ? parseFloat(String(currency.latestRate.rate)).toFixed(2) : '—'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {currency.latestRate?.createdAt 
                        ? `Оновлено: ${new Date(currency.latestRate.createdAt).toLocaleDateString()}` 
                        : 'Немає даних'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <DashboardCard 
            title="Робочі валюти" 
            action={
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => ensureDefaults()}
                  disabled={ensuring}
                >
                  Відновити базу (UAH)
                </Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<IconPlus size={18} />}
                  onClick={() => setIsCurrencyModalOpen(true)}
                >
                  Додати
                </Button>
              </Stack>
            }
          >
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Код</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Символ</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Назва</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Базова</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currenciesLoading ? (
                    <TableRow><TableCell colSpan={4} align="center" sx={{ py: 3 }}><CircularProgress size={24} /></TableCell></TableRow>
                  ) : (
                    currenciesData?.currencies.map((c) => (
                      <TableRow key={c.id} hover>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>{c.code}</Typography></TableCell>
                        <TableCell>{c.symbol}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              px: 1, 
                              py: 0.5, 
                              borderRadius: 1, 
                              bgcolor: c.isRetailDefault ? 'success.light' : 'grey.100',
                              color: c.isRetailDefault ? 'success.main' : 'text.secondary',
                              fontWeight: 600
                            }}
                          >
                            {c.isRetailDefault ? 'Так' : 'Ні'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <DashboardCard 
            title="Останні курси (NBU)" 
            subtitle="Останні 10 записів"
            action={
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={syncing ? <CircularProgress size={18} /> : <IconRefresh size={18} />}
                onClick={() => syncRates()}
                disabled={syncing}
              >
                Синхронізувати з НБУ
              </Button>
            }
          >
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Валюта</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Курс (UAH)</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Дата оновлення</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratesLoading ? (
                    <TableRow><TableCell colSpan={3} align="center" sx={{ py: 3 }}><CircularProgress size={24} /></TableCell></TableRow>
                  ) : (
                    ratesData?.exchangeRates.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                            <Typography variant="subtitle2" fontWeight={600}>{r.currency.code}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" color="primary.main" fontWeight={700}>
                            {Number(r.rate).toFixed(4)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(r.effectiveDate).toLocaleString('uk-UA')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {ratesData?.exchangeRates.length === 0 && !ratesLoading && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" color="textSecondary">Дані про курси відсутні</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DashboardCard>
        </Grid>
      </Grid>

      <Dialog open={isCurrencyModalOpen} onClose={() => setIsCurrencyModalOpen(false)} maxWidth={false} fullWidth sx={{ '& .MuiDialog-paper': { maxWidth: '500px' } }}>
        <DialogTitle>Додати робочу валюту</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 1 }}>
            <Stack spacing={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Код валюти</InputLabel>
                <Select
                  value={newCurrency.code}
                  label="Код валюти"
                  displayEmpty
                  onChange={(e) => {
                    const code = e.target.value;
                    const selected = supportedCurrenciesData?.supportedCurrencies.find(s => s.code === code);
                    if (selected) {
                      setNewCurrency({
                        ...newCurrency,
                        code,
                        name: selected.name,
                        symbol: selected.symbol,
                      });
                    }
                  }}
                >
                  {supportedCurrenciesData?.supportedCurrencies
                    .filter(s => s.code !== 'UAH' && !currenciesData?.currencies.some(c => c.code === s.code))
                    .map((s) => (
                      <MenuItem key={s.code} value={s.code}>
                        {s.code} - {s.name}
                      </MenuItem>
                    ))}
                  {supportedCurrenciesData?.supportedCurrencies.filter(s => s.code !== 'UAH' && !currenciesData?.currencies.some(c => c.code === s.code)).length === 0 && (
                    <MenuItem disabled>
                      {supportedCurrenciesData ? "Усі доступні валюти вже додано" : "Завантаження..."}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Назва"
                value={newCurrency.name}
                size="small"
                disabled
              />
              <TextField
                fullWidth
                label="Символ"
                value={newCurrency.symbol}
                size="small"
                disabled
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={newCurrency.isRetailDefault} 
                    onChange={(e) => setNewCurrency({ ...newCurrency, isRetailDefault: e.target.checked })}
                  />
                }
                label="Базова валюта (UAH за замовчуванням)"
                disabled
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCurrencyModalOpen(false)} color="inherit">Скасувати</Button>
          <Button 
            onClick={handleCreateCurrency} 
            variant="contained" 
            disabled={creating || !newCurrency.code}
          >
            {creating ? 'Додавання...' : 'Зберегти'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
