'use client';

import React, {useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    styled,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import {
    IconBellRinging,
    IconBox,
    IconCurrencyDollar,
    IconLayoutDashboard,
    IconLogout,
    IconMenu2,
    IconSettings,
    IconTools,
    IconTruckDelivery,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import {useQuery} from '@apollo/client';
import {MeDocument} from '@/gql/graphql';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const SidebarWidth = 270;

const HeaderStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));

interface SidebarItem {
  title: string;
  icon: any;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Дашборд', icon: IconLayoutDashboard, href: '/' },
  { title: 'Ремонти', icon: IconTools, href: '/repairs' },
  { title: 'Склад', icon: IconBox, href: '/inventory' },
  { title: 'Групи товарів', icon: IconBox, href: '/inventory/groups' },
  { title: 'Виробники', icon: IconBox, href: '/inventory/manufacturers' },
  { title: 'Прихід', icon: IconTruckDelivery, href: '/inbound' },
  { title: 'Постачальники', icon: IconTruckDelivery, href: '/suppliers' },
  { title: 'Послуги', icon: IconTools, href: '/services' },
  { title: 'Фінанси', icon: IconCurrencyDollar, href: '/finance' },
  { title: 'Користувачі', icon: IconUsers, href: '/users' },
  { title: 'Налаштування', icon: IconSettings, href: '/settings' },
];

export function MainLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const pathname = usePathname();
  const router = useRouter();

  const { data, loading } = useQuery(MeDocument);

  React.useEffect(() => {
    if (!loading && !data?.me && pathname !== '/login') {
      router.push('/login');
    }
  }, [data, loading, pathname, router]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const sidebarContent = (
    <Box p={3} height="100%">
      <Box mb={4} display="flex" alignItems="center" gap={1}>
        <IconTools size={32} color="#5D87FF" />
        <Typography variant="h4" fontWeight={700} color="textPrimary">
          Fix Flow
        </Typography>
      </Box>
      <List component="nav" sx={{ px: 0 }}>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItemButton
              key={item.title}
              component={Link}
              href={item.href}
              selected={isActive}
              sx={{
                mb: 1,
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  '&:hover': { backgroundColor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px', color: isActive ? 'white' : 'inherit' }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <MainWrapper>
      {/* Sidebar */}
      {lgUp ? (
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: SidebarWidth,
              boxShadow: (theme) => theme.shadows[8],
              border: '0 !important',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="left"
          open={isMobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          variant="temporary"
          PaperProps={{
            sx: {
              width: SidebarWidth,
              boxShadow: (theme) => theme.shadows[8],
              border: '0 !important',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      <PageWrapper sx={{ ml: lgUp && isSidebarOpen ? `${SidebarWidth}px` : 0 }}>
        {/* Header */}
        <HeaderStyled position="sticky" color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={lgUp ? () => setSidebarOpen(!isSidebarOpen) : () => setMobileSidebarOpen(true)}
            >
              <IconMenu2 size="20" />
            </IconButton>

            <Typography variant="h5" sx={{ ml: 2, fontWeight: 600 }}>
              {title}
            </Typography>

            <Box flexGrow={1} />

            <Stack spacing={1} direction="row" alignItems="center">
              <IconButton color="inherit">
                <IconBellRinging size="20" />
              </IconButton>
              <Box>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileClick}
                >
                  <Avatar
                    src=""
                    alt="User"
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleProfileClose}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  sx={{
                    '& .MuiMenu-paper': {
                      width: '200px',
                      mt: 1,
                    },
                  }}
                >
                  <MenuItem onClick={handleProfileClose}>
                    <ListItemIcon>
                      <IconUser size={18} />
                    </ListItemIcon>
                    Профіль
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <IconLogout size={18} />
                    </ListItemIcon>
                    Вийти
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Toolbar>
        </HeaderStyled>

        <Container
          maxWidth={false}
          sx={{
            paddingTop: '30px',
            paddingLeft: lgUp ? '30px !important' : '20px !important',
            paddingRight: lgUp ? '30px !important' : '20px !important',
          }}
        >
          {loading || (!data?.me && pathname !== '/login') ? (
             <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography>Завантаження...</Typography>
             </Box>
          ) : (
            children
          )}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
