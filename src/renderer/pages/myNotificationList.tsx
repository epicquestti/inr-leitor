import { Close as CloseIcon } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Snackbar,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { DataGrid, View } from "../components"

const MyNotificationList = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")
  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [openAguarde, setOpenAguarde] = useState<boolean>(false)
  const [notificacaoLista, setNotificacaoLista] = useState<any[]>([])

  useEffect(() => {
    async function init() {
      try {
        if (!router.isReady) return

        window.Main.on("goToNotificationAction", (data: any) => {
          if (data.success) {
            if (data.data.goTo) {
              setOpenAguarde(true)
              setLoading(true)

              if (data.data.type === "A" || data.data.type === "U") {
                setTimeout(() => {
                  window.Main.send(
                    "updatesOpenInBrowser",
                    data.data.notificacao
                  )
                  setOpenAguarde(false)
                  setLoading(false)
                }, 2000)
              } else {
                setTimeout(() => {
                  router.push(data.data.goTo)
                  setOpenAguarde(false)
                  setLoading(false)
                }, 2000)
              }
            }
          } else {
            setMsg(data.message)
            setOpenSnack(true)
            setOpenAguarde(false)
            setLoading(false)
          }
        })

        window.Main.on("reloadNotificationGrid", (data: any) => {
          if (data.success) {
            setNotificacaoLista(data.data.notificationList)
            setTimeout(() => {
              setOpenAguarde(false)
              setLoading(false)
            }, 2000)
          } else {
            setMsg(data.message)
            setOpenSnack(true)
            setOpenAguarde(false)
            setLoading(false)
          }
        })

        setOpenAguarde(true)
        setLoading(true)
        window.Main.send("getNotificationList")
        window.Main.send("getNotificationGrid")
      } catch (error: any) {
        setMsg(error.toString())
        setOpenSnack(true)
        setOpenAguarde(false)
        setLoading(false)
      }
    }
    init()
  }, [])

  const handleClose = () => {
    setOpenSnack(false)
  }

  const handleCloseAguarde = () => {
    setOpenAguarde(false)
  }

  const allReaded = () => {
    try {
      setOpenAguarde(true)
      setLoading(true)
      window.Main.send("allNotificationReaded")
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
      setOpenAguarde(false)
      setLoading(false)
    }
  }

  const goTo = (id: number) => {
    try {
      setOpenAguarde(true)
      setLoading(true)
      window.Main.send("goToThisNotifyClick", { id })
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
      setOpenAguarde(false)
      setLoading(false)
    }
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
    <View loading={false}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ p: 3, background: "#ECEFF1" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h5">Notificações recebidas.</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}></Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  variant="contained"
                  onClick={() => {
                    router.push("/")
                  }}
                  fullWidth
                >
                  Voltar
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  variant="contained"
                  onClick={allReaded}
                  fullWidth
                >
                  Marcas todas como lida
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataGrid
                  gridHeaders={[
                    { field: "text", headerName: "Conteúdo." },
                    {
                      field: "read",
                      headerName: "status",
                      tag: {
                        trueCase: {
                          text: "Lido",
                          color: "#81C784",
                          colorText: "#000000"
                        },
                        falseCase: {
                          text: "Ñ Lido",
                          color: "#FFCC80",
                          colorText: "#000000"
                        }
                      }
                    },
                    { field: "createdAt", headerName: "Data" }
                  ]}
                  gridData={notificacaoLista}
                  loading={loading}
                  hidePagination
                  onSelectedRow={goTo}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog onClose={handleCloseAguarde} open={openAguarde}>
        <DialogTitle>Por favor aguarde...</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </View>
  )
}

export default MyNotificationList
