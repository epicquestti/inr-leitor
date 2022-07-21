import {
  AdminPanelSettings,
  Announcement,
  Article,
  BrowserUpdated,
  BugReport,
  Close,
  Cloud,
  Info,
  Notifications,
  Refresh,
  Settings,
  Storage
} from "@mui/icons-material"
import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, MouseEvent, useEffect, useState } from "react"
import { appBarProps, notifications } from "./props"

const NotificationList = styled(Menu)(() => ({
  marginTop: "30px",
  maxHeight: 230,
  "& .MuiMenu-paper": {
    "&::-webkit-scrollbar": {
      width: "10px"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#424242",
      borderRadius: "10px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#B0BEC5"
    }
  }
}))

const ApplicationBar: FC<appBarProps> = ({ ...props }) => {
  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const [anchorElNotifications, setAnchorElNotifications] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const [notificationList, setNotificationList] = useState<notifications[]>([])
  const [notificationCount, setNotificationCount] = useState<number>(0)
  const [closeDialogStatus, setCloseDialogStatus] = useState<boolean>(false)
  const [closeAboutDialog, setCloseAboutDialog] = useState<boolean>(false)
  const [verifing, setVerifing] = useState<boolean>(false)
  useEffect(() => {
    window.Main.on("globalProcess", (data: any) => {
      if (data) {
        router.push(data)
      }
    })
    window.Main.on("reloadNotificationList", (data: any) => {
      if (data.success) {
        setNotificationList(data.data.notificationList)
        setNotificationCount(data.data.notificationCount)
      }
    })
  }, [])

  const handleCloseDialog = async () => {
    setCloseDialogStatus(false)
  }

  const handleCloseAboutDialog = async () => {
    setCloseAboutDialog(false)
  }

  const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenNotificationsMenu = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElNotifications(event.currentTarget)
  }

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null)
  }

  const handleNotification = () => {
    setAnchorElUser(null)
    router.push("/notificacoes")
  }

  const handleNotificationSelect = async (notification: notifications) => {
    try {
      switch (notification.type) {
        case "A":
        case "U":
          window.Main.send("updatesOpenInBrowser", notification)
          break
        case "B":
          router.push(`/boletim/${notification.relatedDocumentId}`)
          break
        case "C":
          router.push(`/classificador/${notification.relatedDocumentId}`)
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  const goToAllNotifies = async () => {
    router.push("/myNotificationList")
  }

  const closeApp = async () => {
    setCloseDialogStatus(true)
  }

  const handleVerifyBoletins = async () => {
    setVerifing(!verifing)
  }

  const handleAbout = async () => {
    setAnchorElUser(null)
    setCloseAboutDialog(true)
  }

  const handleReport = async () => {
    setAnchorElUser(null)
    router.push("/reportBug")
  }

  return (
    <AppBar sx={{ background: "#212121" }} position="absolute">
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }}>
          <Tooltip
            title={`${
              props.hasInternet ? "Você esta online" : "Você esta Offline"
            }`}
          >
            <Cloud
              sx={{
                marginRight: 2,
                color: props.hasInternet ? "green" : "red"
              }}
            />
          </Tooltip>

          <Tooltip
            title={`${
              props.dbIsConnected
                ? "Base local conectada"
                : "Base local desconectada ou inexistente"
            }`}
          >
            <Storage sx={{ color: props.dbIsConnected ? "green" : "red" }} />
          </Tooltip>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="notification-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenNotificationsMenu}
          >
            <Tooltip
              title={`${
                notificationCount > 0
                  ? `Você possui ${notificationCount} Notificação(ões) não lida(s).`
                  : `Você não possui nenhuma nova notificação.`
              }`}
            >
              <Badge badgeContent={notificationCount} color="primary">
                <Notifications />
              </Badge>
            </Tooltip>
          </IconButton>
          <NotificationList
            id="notification-appbar"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotificationsMenu}
            disableScrollLock={true}
          >
            {notificationList && notificationList.length > 0 ? (
              notificationList.map(notificationItem => (
                <MenuItem
                  onClick={() => {
                    handleNotificationSelect(notificationItem)
                  }}
                  key={"notification-item-position-" + notificationItem.id}
                >
                  {notificationItem.type === "A" && <BrowserUpdated />}
                  {notificationItem.type === "B" && <Article />}
                  {notificationItem.type === "C" && <Announcement />}
                  <Box sx={{ display: "block", width: "100%", ml: 2 }}>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="caption">
                        <strong>
                          {notificationItem.type === "A"
                            ? "Atualização"
                            : notificationItem.type === "B"
                            ? "Boletim"
                            : notificationItem.type === "C"
                            ? "Classificadores"
                            : "Outros"}{" "}
                          -{" "}
                          {notificationItem.createdAt.toLocaleDateString() +
                            " " +
                            notificationItem.createdAt.toLocaleTimeString()}
                        </strong>{" "}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="body2">
                        {notificationItem.text}
                      </Typography>
                    </Box>
                  </Box>
                  {!notificationItem.readed && (
                    <Box
                      sx={{
                        background: "#00897B",
                        pl: 0.7,
                        pr: 0.7,
                        borderRadius: 1,
                        ml: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#ffffffff" }}>
                        NOVO
                      </Typography>
                    </Box>
                  )}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="caption" color="#546E7A">
                    <strong>Você não possui nenhuma notificação.</strong>
                  </Typography>
                </Box>
              </MenuItem>
            )}

            {notificationList && notificationList.length > 0 && (
              <MenuItem
                onClick={() => {
                  goToAllNotifies()
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="caption" color="#0D47A1">
                    <strong>Ver todas as notificações.</strong>
                  </Typography>
                </Box>
              </MenuItem>
            )}
          </NotificationList>

          <Tooltip title="Configurações">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <Settings />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "30px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleNotification}>
              <AdminPanelSettings />
              <Box
                sx={{
                  width: "100%",
                  ml: 1,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Typography>Notificações</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleVerifyBoletins}>
              <Refresh />
              <Box
                sx={{
                  width: "100%",
                  ml: 1,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Typography>Verificar</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleAbout}>
              <Info />
              <Box
                sx={{
                  width: "100%",
                  ml: 1,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Typography>Sobre</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleReport}>
              <BugReport />
              <Box
                sx={{
                  width: "100%",
                  ml: 1,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Typography>Reporte um bug</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={closeApp}>
              <Close />
              <Box
                sx={{
                  width: "100%",
                  ml: 1,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Typography>Sair</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <Dialog
        open={closeDialogStatus}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja realmente sair ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja Realmente Sair do Leitor INR ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog()
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              window.Main.send("CloseApp")
            }}
            autoFocus
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
      {/* About */}
      <Dialog
        open={closeAboutDialog}
        onClose={handleCloseAboutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">INR Leitor</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1">
              INR Publicações © {new Date().getFullYear()}. Todos os direitos
              reservados.
            </Typography>
            <br />
            <Typography variant="body1">
              <strong>Versão: </strong>
              <em>0.2.62</em>
            </Typography>
            <Typography variant="body1">
              <strong>Data da publicação: </strong>
              <em>01/01/2011</em>
            </Typography>
            <br />
            <Box sx={{ display: "flex" }}>
              <Typography variant="caption" sx={{ color: "#000080" }}>
                <strong>
                  Editado por Boletins Informativos Ltda – CNPJ:
                  62.173.406/0001-23
                </strong>
              </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Typography variant="caption" sx={{ color: "#000080" }}>
                <strong>
                  Rua Voluntários da Pátria, 2.468 – 23º andar – CEP 02402-000 –
                  Santana – São Paulo / SP
                </strong>{" "}
              </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Typography variant="caption" sx={{ color: "#000080" }}>
                <strong>
                  Central do Assinante: (11) 2959 0220 / faleconosco@inr.com.br
                </strong>
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setCloseAboutDialog(false)
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}

export default ApplicationBar
