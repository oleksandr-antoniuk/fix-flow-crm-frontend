'use client';

import { useQuery } from '@apollo/client';
import { CurrenciesDocument, ExchangeRatesDocument } from '@/gql/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign } from 'lucide-react';

export default function FinancePage() {
  const { data: currenciesData, loading: currenciesLoading } = useQuery(CurrenciesDocument);
  const { data: ratesData, loading: ratesLoading } = useQuery(ExchangeRatesDocument);

  return (
    <MainLayout title="Фінанси">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign size={20} /> Валюти
            </h3>
            <Button size="sm" className="gap-2">
              <Plus size={16} /> Додати
            </Button>
          </div>
          <div className="bg-background rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Код</TableHead>
                  <TableHead>Символ</TableHead>
                  <TableHead>Назва</TableHead>
                  <TableHead>Базова</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currenciesLoading ? (
                  <TableRow><TableCell colSpan={4} className="text-center">Завантаження...</TableCell></TableRow>
                ) : (
                  currenciesData?.currencies.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-bold">{c.code}</TableCell>
                      <TableCell>{c.symbol}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.isRetailDefault ? 'Так' : 'Ні'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Курси валют
            </h3>
            <Button size="sm" className="gap-2">
              <Plus size={16} /> Оновити курс
            </Button>
          </div>
          <div className="bg-background rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Валюта</TableHead>
                  <TableHead>Курс</TableHead>
                  <TableHead>Дата</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ratesLoading ? (
                  <TableRow><TableCell colSpan={3} className="text-center">Завантаження...</TableCell></TableRow>
                ) : (
                  ratesData?.exchangeRates.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-bold">{r.currency.code}</TableCell>
                      <TableCell>{r.rate}</TableCell>
                      <TableCell>{new Date(r.effectiveDate).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
