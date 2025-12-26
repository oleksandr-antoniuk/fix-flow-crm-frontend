'use client';

import { useQuery } from '@apollo/client';
import { SparePartsDocument } from '@/gql/graphql';
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
import { Plus, Search, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function InventoryPage() {
  const { data, loading } = useQuery(SparePartsDocument);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = data?.spareParts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Склад">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Пошук запчастин..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="gap-2">
            <Plus size={18} />
            Додати запчастину
          </Button>
        </div>

        <div className="bg-background rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Виробник</TableHead>
                <TableHead>Роздрібна ціна</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Завантаження...
                  </TableCell>
                </TableRow>
              ) : filteredParts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Нічого не знайдено
                  </TableCell>
                </TableRow>
              ) : (
                filteredParts?.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell>{part.sku || '-'}</TableCell>
                    <TableCell>{part.manufacturer || '-'}</TableCell>
                    <TableCell>
                      {part.priceRetail} {part.priceRetailCurrency?.symbol}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Редагувати</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
