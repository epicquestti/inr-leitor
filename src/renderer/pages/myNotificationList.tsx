import {
  Close as CloseIcon,
  DoneAll,
  RemoveDone,
  Visibility
} from "@mui/icons-material"
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
import { View } from "../components"
import { DataGridV2 } from "../components/common"

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
            }, 500)
          } else {
            setMsg(data.message)
            setOpenSnack(true)
            setOpenAguarde(false)
            setLoading(false)
          }
        })

        window.Main.on("notificationSendToTarget", (data: any) => {
          if (data.success) {
            if (data.data.type === "B") {
              router.push(`/boletim/${data.data.relatedDocumentId}`)
            }
            if (data.data.type === "C") {
              router.push(`/classificador/${data.data.relatedDocumentId}`)
            }
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

  const actionSelect = (id: number, actionName: string) => {
    try {
      setLoading(true)
      window.Main.send("notificationActionSelect", { id, actionName })
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
      setOpenAguarde(false)
      setLoading(false)
    }
  }

  const groupActionSelect = (list: number[], actionName: string) => {
    try {
      setLoading(true)
      switch (actionName) {
        case "readAll":
          window.Main.send("notificationAllAction", { readState: true })
          break
        case "unreadAll":
          window.Main.send("notificationAllAction", { readState: false })
          break
        case "readThisList":
          window.Main.send("notificationListAction", { readState: true, list })
          break
        case "unreadThisList":
          window.Main.send("notificationListAction", { readState: false, list })
          break
      }
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
              <Grid item xs={12} sm={12} md={10} lg={10} xl={10}></Grid>

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

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataGridV2
                  loading={loading}
                  hasActions
                  selectable
                  data={notificacaoLista}
                  actionTrigger={actionSelect}
                  groupActionTrigger={groupActionSelect}
                  actions={[
                    {
                      text: "visualizar",
                      name: "lookThis",
                      icon: <Visibility />
                    },
                    {
                      text: "Marcar como lido",
                      name: "readThis",
                      icon: <DoneAll />
                    },
                    {
                      text: "Marcar como Não lido",
                      name: "unreadThis",
                      icon: <RemoveDone />
                    }
                  ]}
                  headers={[
                    {
                      text: "Conteúdo",
                      attrName: "text",
                      align: "left",
                      width: 8
                    },
                    {
                      text: "status",
                      attrName: "read",
                      align: "center",
                      width: 1,
                      custom: {
                        isIcon: true
                      }
                    },
                    {
                      text: "Data",
                      attrName: "createdAt",
                      align: "center",
                      width: 1
                    }
                  ]}
                  groupActions={[
                    {
                      icon: "done_all",
                      name: "readAll",
                      text: "Marcar todos como lidos."
                    },
                    {
                      icon: "remove_done",
                      name: "unreadAll",
                      text: "Marcar todos como não lidos."
                    },
                    {
                      icon: "done",
                      name: "readThisList",
                      text: "Marcar item(ns) selecionado(s) como lido(s)."
                    },
                    {
                      icon: "remove",
                      name: "unreadThisList",
                      text: "Marcar item(ns) selecionado(s) como não lido(s)."
                    }
                  ]}
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
