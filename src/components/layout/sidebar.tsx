'use client';
import { useQuery } from '@apollo/client';
import { MeDocument } from '@/gql/graphql';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Wrench, 
  FileDown, 
  FileUp, 
  BarChart3, 
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useQuery(MeDocument);

  const logout = () => {
    localStorage.removeItem('token');
    // Refresh token is in httpOnly cookie, so we can't clear it from JS.
    // Ideally, call a logout mutation here if backend supports it.
    router.push('/login');
  };

  const navItems = [
    { label: 'Дашборд', icon: LayoutDashboard, href: '/' },
    { label: 'Ремонти', icon: Wrench, href: '/repairs' },
    { label: 'Склад', icon: Package, href: '/inventory' },
    { label: 'Прихід', icon: FileUp, href: '/inbound' },
    { label: 'Продаж/Списання', icon: FileDown, href: '/outbound' },
    { label: 'Фінанси', icon: DollarSign, href: '/finance' },
    { label: 'Аналітика', icon: BarChart3, href: '/analytics' },
    { label: 'Користувачі', icon: Users, href: '/users' },
    { label: 'Налаштування', icon: Settings, href: '/settings' },
  ];

  const role = data?.me?.role;

  // Filter items based on role if needed
  const filteredNavItems = navItems.filter(item => {
    if (['/settings', '/users', '/finance'].includes(item.href)) {
      return role === 'ADMIN' || role === 'MANAGER';
    }
    return true;
  });

  return (
    <aside className="w-64 border-r bg-background flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">Fix Flow CRM</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="mb-4 px-3 py-2">
          <p className="text-sm font-medium truncate">{data?.me?.firstname} {data?.me?.lastname}</p>
          <p className="text-xs text-muted-foreground uppercase">{data?.me?.role}</p>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut size={18} />
          Вихід
        </Button>
      </div>
    </aside>
  );
}
