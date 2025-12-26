'use client';

import { useQuery } from '@apollo/client';
import { MeDocument } from '@/gql/graphql';
import { MainLayout } from '@/components/layout/main-layout';
import { Grid, Typography, Box, Stack } from '@mui/material';
import DashboardCard from '@/components/shared/DashboardCard';
import { IconDeviceDesktop, IconTool, IconCalendar } from '@tabler/icons-react';

export default function Dashboard() {
  const { data } = useQuery(MeDocument);

  return (
    <MainLayout title="Панель керування">
      {data?.me && (
        <Box>
          <Grid container spacing={3}>
            {/* Top Cards */}
            <Grid size={{ xs: 12, md: 4 }}>
              <DashboardCard>
                <Stack direction="row" spacing={3} alignItems="center">
                   <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                      <IconDeviceDesktop color="#5D87FF" size={24} />
                   </Box>
                   <Box>
                      <Typography variant="subtitle2" color="textSecondary">Офіс</Typography>
                      <Typography variant="h4">{data.me.office.name}</Typography>
                   </Box>
                </Stack>
              </DashboardCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DashboardCard>
                <Stack direction="row" spacing={3} alignItems="center">
                   <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                      <IconTool color="#49BEFF" size={24} />
                   </Box>
                   <Box>
                      <Typography variant="subtitle2" color="textSecondary">Активні ремонти</Typography>
                      <Typography variant="h4">12</Typography>
                   </Box>
                </Stack>
              </DashboardCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DashboardCard>
                <Stack direction="row" spacing={3} alignItems="center">
                   <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                      <IconCalendar color="#13DEB9" size={24} />
                   </Box>
                   <Box>
                      <Typography variant="subtitle2" color="textSecondary">Замовлення за місяць</Typography>
                      <Typography variant="h4">45</Typography>
                   </Box>
                </Stack>
              </DashboardCard>
            </Grid>

            {/* Main Content Area */}
            <Grid size={{ xs: 12 }}>
              <DashboardCard title="Активність сервісу">
                 <Box height="400px" display="flex" alignItems="center" justifyContent="center">
                    <Typography color="textSecondary">
                      Графік активності буде інтегровано пізніше
                    </Typography>
                 </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      )}
    </MainLayout>
  );
}
