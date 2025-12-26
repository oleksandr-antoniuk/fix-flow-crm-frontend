"use client"

import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import {
  RepairOrderDocument,
  UpdateRepairOrderDocument,
  AddServiceToRepairDocument,
  InstallStockItemDocument,
  ReserveStockItemDocument,
  UnreserveStockItemDocument,
  RemoveRepairOrderItemDocument,
  RepairOrdersDocument,
  RepairStatus,
  ServicesDocument,
  SparePartsDocument,
  MeDocument,
} from "@/gql/graphql"
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Grid,
  Stack,
  TextField,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material"
import {
  IconX,
  IconPlus,
  IconTrash,
  IconCheck,
  IconArrowBackUp,
} from "@tabler/icons-react"
import DashboardCard from "../shared/DashboardCard"

interface RepairCardProps {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RepairCard({ id, open, onOpenChange }: RepairCardProps) {
  const [activeTab, setActiveTab] = useState(0)
  const { data: meData } = useQuery(MeDocument)
  const { data, loading, refetch } = useQuery(RepairOrderDocument, {
    variables: { id },
    skip: !id,
  })

  const { data: servicesData } = useQuery(ServicesDocument)
  const { data: sparePartsData } = useQuery(SparePartsDocument)

  const [updateRepair] = useMutation(UpdateRepairOrderDocument)
  const [addService] = useMutation(AddServiceToRepairDocument)
  const [installPart] = useMutation(InstallStockItemDocument)
  const [reservePart] = useMutation(ReserveStockItemDocument)
  const [unreservePart] = useMutation(UnreserveStockItemDocument)
  const [removeItem] = useMutation(RemoveRepairOrderItemDocument)

  const [agreedPrice, setAgreedPrice] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [servicePrice, setServicePrice] = useState("")
  const [partSerial, setPartSerial] = useState("")

  const repair = data?.repairOrder
  const isMaster = meData?.me?.role === "MASTER"
  const isOwner = repair?.assignedMaster?.id === meData?.me?.id
  const canEdit = meData?.me?.role === "ADMIN" || meData?.me?.role === "MANAGER" || isOwner

  if (loading) return null

  const handleUpdateAgreedPrice = async () => {
    await updateRepair({
      variables: {
        data: {
          id,
          agreedPrice: agreedPrice || null,
        },
      },
    })
    refetch()
  }

  const handleStatusChange = async (status: string) => {
    await updateRepair({
      variables: {
        data: {
          id,
          status: status as any,
        },
      },
    })
    refetch()
  }

  const handleAddService = async () => {
    if (!selectedService) return
    await addService({
      variables: {
        data: {
          repairOrderId: id,
          serviceId: selectedService,
          customPrice: servicePrice || null,
        },
      },
    })
    setSelectedService("")
    setServicePrice("")
    refetch()
  }

  const handleReservePart = async () => {
    if (!partSerial) return
    await reservePart({
      variables: {
        data: {
          repairOrderId: id,
          stockItemSerial: partSerial,
        },
      },
    })
    setPartSerial("")
    refetch()
  }

  const handleInstallPart = async (stockItemId: string) => {
    await installPart({
      variables: {
        data: {
          repairOrderId: id,
          stockItemId,
        },
      },
    })
    refetch()
  }

  const handleUnreservePart = async (stockItemId: string) => {
    await unreservePart({
      variables: {
        data: {
          stockItemId,
        },
      },
    })
    refetch()
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeItem({
      variables: {
        data: {
          id: itemId,
        },
      },
    })
    refetch()
  }

  const totalPrice = repair?.repairOrderItems?.reduce((sum, item) => sum + (item.price || 0), 0) || 0

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} maxWidth="lg" fullWidth>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Картка ремонту #{repair?.id.slice(-6).toUpperCase()}</Typography>
          <IconButton onClick={() => onOpenChange(false)} size="small">
            <IconX size="24" />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Main Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard title="Інформація про пристрій">
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="textSecondary">Пристрій</Typography>
                  <Typography variant="h6">{repair?.deviceName}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">Серійний номер</Typography>
                  <Typography variant="body1">{repair?.deviceSerial || "—"}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">Клієнт</Typography>
                  <Typography variant="body1">
                    {repair?.client ? `${repair.client.firstname} ${repair.client.lastname}` : "—"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">Майстер</Typography>
                  <Typography variant="body1">
                    {repair?.assignedMaster.firstname} {repair?.assignedMaster.lastname}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">Опис проблеми</Typography>
                  <Typography variant="body2">{repair?.problemDescription || "Немає опису"}</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="textSecondary" display="block" mb={1}>Статус ремонту</Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={repair?.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      disabled={!canEdit}
                    >
                      {Object.values(RepairStatus).map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </DashboardCard>
          </Grid>

          {/* Billing & Management */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box mb={3}>
              <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
                <Tab label="Роботи та запчастини" />
                <Tab label="Резервування" />
              </Tabs>

              {activeTab === 0 && (
                <Stack spacing={3}>
                  {/* Actions for Add */}
                  {canEdit && (
                    <Box display="flex" gap={2} alignItems="flex-end">
                      <FormControl fullWidth size="small">
                        <InputLabel>Додати послугу</InputLabel>
                        <Select
                          value={selectedService}
                          label="Додати послугу"
                          onChange={(e) => setSelectedService(e.target.value)}
                        >
                          {servicesData?.services.map((s) => (
                            <MenuItem key={s.id} value={s.id}>{s.name} ({s.cost}₴)</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        size="small"
                        label="Ціна"
                        type="number"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        sx={{ width: 150 }}
                      />
                      <Button variant="contained" onClick={handleAddService} startIcon={<IconPlus size={18} />}>
                        Додати
                      </Button>
                    </Box>
                  )}

                  {/* Items Table */}
                  <TableContainer component={Box} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Назва</TableCell>
                          <TableCell>Тип</TableCell>
                          <TableCell align="right">Ціна</TableCell>
                          {canEdit && <TableCell align="right">Дії</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {repair?.repairOrderItems?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.service?.name || item.sparePart?.name}</TableCell>
                            <TableCell>
                              {item.service ? <Chip label="Послуга" size="small" /> : <Chip label="Запчастина" color="primary" variant="outlined" size="small" />}
                            </TableCell>
                            <TableCell align="right">{item.price}₴</TableCell>
                            {canEdit && (
                              <TableCell align="right">
                                <IconButton size="small" color="error" onClick={() => handleRemoveItem(item.id)}>
                                  <IconTrash size="18" />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                        {repair?.repairOrderItems?.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                              Поки що немає доданих робіт чи запчастин
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Totals */}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h5">Всього: {totalPrice}₴</Typography>
                    </Box>
                    <Box display="flex" gap={2} alignItems="center">
                      <Typography variant="h6">Погоджена ціна:</Typography>
                      <TextField
                        size="small"
                        type="number"
                        placeholder="0.00"
                        defaultValue={repair?.agreedPrice}
                        onBlur={(e) => {
                            setAgreedPrice(e.target.value);
                            handleUpdateAgreedPrice();
                        }}
                        disabled={!canEdit}
                        sx={{ width: 120 }}
                      />
                      <Typography variant="h6">₴</Typography>
                    </Box>
                  </Box>
                </Stack>
              )}

              {activeTab === 1 && (
                <Stack spacing={3}>
                  {/* Reserve Action */}
                  {canEdit && (
                    <Box display="flex" gap={2} alignItems="flex-end">
                      <TextField
                        fullWidth
                        size="small"
                        label="Серійний номер запчастини"
                        placeholder="Введіть або скануйте серійний номер"
                        value={partSerial}
                        onChange={(e) => setPartSerial(e.target.value)}
                      />
                      <Button variant="contained" onClick={handleReservePart} startIcon={<IconPlus size={18} />}>
                        Резервувати
                      </Button>
                    </Box>
                  )}

                  {/* Reserved Items Table */}
                  <TableContainer component={Box} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Запчастина</TableCell>
                          <TableCell>Серійний номер</TableCell>
                          {canEdit && <TableCell align="right">Дії</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {repair?.reservedStockItems?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.sparePart?.name}</TableCell>
                            <TableCell>{item.serialInternal}</TableCell>
                            {canEdit && (
                              <TableCell align="right">
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                  <Button 
                                    size="small" 
                                    variant="outlined" 
                                    color="success" 
                                    startIcon={<IconCheck size={16} />}
                                    onClick={() => handleInstallPart(item.id)}
                                  >
                                    Встановити
                                  </Button>
                                  <IconButton size="small" color="warning" onClick={() => handleUnreservePart(item.id)}>
                                    <IconArrowBackUp size="18" />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                        {repair?.reservedStockItems?.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                              Немає зарезервованих запчастин
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}