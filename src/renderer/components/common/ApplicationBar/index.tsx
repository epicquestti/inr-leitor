import {
  AdminPanelSettings,
  Announcement,
  Article,
  BrowserUpdated,
  // Close,
  Cloud,
  Notifications,
  Settings,
  Storage
} from "@mui/icons-material"
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, MouseEvent, useEffect, useState } from "react"
import { appBarProps, notifications } from "./props"

const NotificationList = styled(Menu)(({ theme }) => ({
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
          router.push(`/updates`)
          break
        case "B":
          router.push(`/boletim/${notification.relatedDocumentId}`).then(e => {
            console.log(e)
          })
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

  return (
    <AppBar sx={{ background: "#212121" }} position="absolute">
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }}>
          <Cloud
            sx={{ marginRight: 2, color: props.hasInternet ? "green" : "red" }}
          />
          <Storage sx={{ color: props.dbIsConnected ? "green" : "red" }} />
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
            <Badge badgeContent={notificationCount} color="primary">
              <Notifications />
            </Badge>
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
              <MenuItem>
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
              <Box sx={{ width: "100%" }}>
                <Typography>Notificações</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default ApplicationBar
