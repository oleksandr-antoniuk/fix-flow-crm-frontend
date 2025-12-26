"use client"

import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { CreateRepairOrderDocument, CreateUserDocument, RepairOrdersDocument, Role, UsersDocument } from "@/gql/graphql"
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Switch,
  FormControlLabel,
  CircularProgress,
  Button,
  TextField,
  IconButton
} from "@mui/material"
import { IconX } from "@tabler/icons-react"

interface AcceptRepairModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AcceptRepairModal({ open, onOpenChange }: AcceptRepairModalProps) {
  const [isNewClient, setIsNewClient] = useState(false)
  const [clientId, setClientId] = useState("")
  // New client fields
  const [clientFirstname, setClientFirstname] = useState("")
  const [clientLastname, setClientLastname] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const [deviceName, setDeviceName] = useState("")
  const [deviceSerial, setDeviceSerial] = useState("")
  const [problemDescription, setProblemDescription] = useState("")
  const [assignedMasterId, setAssignedMasterId] = useState("")

  const { data: usersData } = useQuery(UsersDocument)
  const masters = usersData?.users.filter(u => u.role === Role.Master || u.role === Role.Admin || u.role === Role.Manager) || []
  const clients = usersData?.users.filter(u => u.role === Role.Client) || []

  const [createUser] = useMutation(CreateUserDocument, {
    refetchQueries: [{ query: UsersDocument }]
  })

  const [createRepair, { loading: creatingRepair }] = useMutation(CreateRepairOrderDocument, {
    refetchQueries: [{ query: RepairOrdersDocument }],
    onCompleted: () => {
      onOpenChange(false)
      resetForm()
    }
  })

  const resetForm = () => {
    setClientId("")
    setClientFirstname("")
    setClientLastname("")
    setClientEmail("")
    setIsNewClient(false)
    setDeviceName("")
    setDeviceSerial("")
    setProblemDescription("")
    setAssignedMasterId("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deviceName || !assignedMasterId) return

    let finalClientId = clientId

    try {
      if (isNewClient) {
        if (!clientFirstname || !clientEmail) return
        
        const { data: userData } = await createUser({
          variables: {
            data: {
              firstname: clientFirstname,
              lastname: clientLastname,
              email: clientEmail,
              role: Role.Client,
              officeId: usersData?.users[0]?.officeId || "" 
            }
          }
        })
        if (userData?.createUser) {
          finalClientId = userData.createUser.id
        }
      }

      if (!finalClientId && !isNewClient) return

      await createRepair({
        variables: {
          data: {
            clientId: finalClientId || null,
            deviceName,
            deviceSerial,
            problemDescription,
            assignedMasterId,
          }
        }
      })
    } catch (err) {
      console.error("Error creating repair:", err)
    }
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} maxWidth="sm" fullWidth>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Прийняти техніку в ремонт</Typography>
          <IconButton onClick={() => onOpenChange(false)} size="small">
            <IconX size="20" />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" fontWeight={600}>Клієнт</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={isNewClient}
                      onChange={(e) => setIsNewClient(e.target.checked)}
                    />
                  }
                  label={<Typography variant="caption">{isNewClient ? "Новий" : "Існуючий"}</Typography>}
                />
              </Box>
              
              {!isNewClient ? (
                <FormControl fullWidth size="small">
                  <InputLabel>Виберіть клієнта</InputLabel>
                  <Select
                    value={clientId}
                    label="Виберіть клієнта"
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.firstname} {client.lastname} ({client.email})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Stack spacing={2} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Ім'я *"
                    value={clientFirstname}
                    onChange={(e) => setClientFirstname(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Прізвище"
                    value={clientLastname}
                    onChange={(e) => setClientLastname(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Email *"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </Stack>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600} mb={1}>Пристрій</Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Назва пристрою *"
                  placeholder="напр. iPhone 13 Pro"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Серійний номер / IMEI"
                  value={deviceSerial}
                  onChange={(e) => setDeviceSerial(e.target.value)}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Опис проблеми"
                  multiline
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                />
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600} mb={1}>Призначення</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Майстер *</InputLabel>
                <Select
                  value={assignedMasterId}
                  label="Майстер *"
                  onChange={(e) => setAssignedMasterId(e.target.value)}
                  required
                >
                  {masters.map((master) => (
                    <MenuItem key={master.id} value={master.id}>
                      {master.firstname} {master.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
          
          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={creatingRepair}
              startIcon={creatingRepair ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Створити замовлення
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
