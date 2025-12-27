'use client';

import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {SparePartGroupsDocument, SystemSettingsDocument, UpsertSystemSettingDocument,} from '@/gql/graphql';
import {MainLayout} from '@/components/layout/main-layout';
import {
    Alert,
    Button,
    CircularProgress,
    InputAdornment,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {IconDeviceFloppy, IconPercentage} from '@tabler/icons-react';
import DashboardCard from '@/components/shared/DashboardCard';

export default function PricingSettingsPage() {
  const { data: groupsData, loading: groupsLoading } = useQuery(SparePartGroupsDocument);
  const [markups, setMarkups] = useState<{ [key: string]: any }>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [upsertSetting, { loading: saving }] = useMutation(UpsertSystemSettingDocument);

  const handleMarkupChange = (groupId: string, field: string, value: string) => {
    setMarkups((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (groupId: string) => {
    const config = markups[groupId] || {};
    await upsertSetting({
      variables: {
        key: `MARKUP_CONFIG_${groupId}`,
        value: JSON.stringify(config),
      },
    });
    setSaveSuccess(true);
  };

  return (
    <MainLayout title="Налаштування націнок">
      <DashboardCard title="Націнки за групами товарів">
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Вкажіть відсоток націнки для кожної групи. Ці ціни будуть автоматично розраховуватися при створенні номенклатури на основі ціни останньої закупівлі.
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Група товару</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Роздрібна націнка (%)</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Націнка 1 (%)</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Націнка 2 (%)</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Дії</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupsLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : groupsData?.sparePartGroups.map((group: any) => (
                <GroupMarkupRow 
                  key={group.id} 
                  group={group} 
                  onChange={handleMarkupChange}
                  onSave={handleSave}
                  saving={saving}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>

      <Snackbar 
        open={saveSuccess} 
        autoHideDuration={3000} 
        onClose={() => setSaveSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Налаштування збережено успішно
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}

function GroupMarkupRow({ group, onChange, onSave, saving }: any) {
  const { data, loading } = useQuery(SystemSettingsDocument, {
    variables: { key: `MARKUP_CONFIG_${group.id}` },
  });

  const [localConfig, setLocalConfig] = useState({
    retailMarkup: '',
    custom1Markup: '',
    custom2Markup: '',
  });

  useEffect(() => {
    if (data?.systemSetting?.value) {
      try {
        const config = JSON.parse(data.systemSetting.value);
        setLocalConfig({
          retailMarkup: config.retailMarkup || '',
          custom1Markup: config.custom1Markup || '',
          custom2Markup: config.custom2Markup || '',
        });
        // Sync with parent state
        Object.keys(config).forEach(key => {
          onChange(group.id, key, config[key]);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [data, group.id]);

  const handleChange = (field: string, value: string) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
    onChange(group.id, field, value);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle1" fontWeight={600}>{group.name}</Typography>
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          value={localConfig.retailMarkup}
          onChange={(e) => handleChange('retailMarkup', e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconPercentage size={16} /></InputAdornment>,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          value={localConfig.custom1Markup}
          onChange={(e) => handleChange('custom1Markup', e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconPercentage size={16} /></InputAdornment>,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          value={localConfig.custom2Markup}
          onChange={(e) => handleChange('custom2Markup', e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconPercentage size={16} /></InputAdornment>,
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          size="small"
          startIcon={<IconDeviceFloppy size={16} />}
          onClick={() => onSave(group.id)}
          disabled={saving}
        >
          Зберегти
        </Button>
      </TableCell>
    </TableRow>
  );
}
