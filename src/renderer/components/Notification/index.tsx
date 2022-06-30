import { ArrowBackIos, Close as CloseIcon } from "@mui/icons-material"
import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Switch,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { notificationProps } from "./props"
const Notification: FC<notificationProps> = () => {
  const router = useRouter()

  const [cl, setCl] = useState(false)
  const [be, setBe] = useState(false)

  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const notifyBeStatus = async (checked: boolean) => {
    setBe(checked)
    await window.Main.send("changeNotifyBE", checked)
  }
  const notifyClStatus = async (checked: boolean) => {
    setCl(checked)
    await window.Main.send("changeNotifyCL", checked)
  }

  useEffect(() => {
    window.Main.on("reloadNotifies", (data: any) => {
      if (data.success) {
        if (data.contents) {
          setCl(data.contents.notifyClassificador)
          setBe(data.contents.notifyBoletim)
        }
      }
    })
    window.Main.on("responseNotifyBE", (data: any) => {
      if (data.success) {
        setMsg(data.msg)
        setOpen(true)
      }
    })
    window.Main.on("responseNotifyCL", (data: any) => {
      if (data.success) {
        setMsg(data.msg)
        setOpen(true)
      }
    })

    window.Main.send("getNotifications", {})
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )
  return (
    <Paper sx={{ p: 3, background: "#ECEFF1" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">Configurações de notificações</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={cl}
                  onChange={(
                    _: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) => {
                    notifyClStatus(checked)
                  }}
                />
              }
              label="Notificar Classificadores."
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={be}
                  onChange={(
                    _: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) => {
                    notifyBeStatus(checked)
                  }}
                />
              }
              label="Notificar Boletins."
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}></Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          <Button
            fullWidth
            startIcon={<ArrowBackIos />}
            onClick={() => router.push("/")}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </Paper>
  )
}

export default Notification
