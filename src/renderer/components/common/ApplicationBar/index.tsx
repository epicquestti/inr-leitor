import {
  AdminPanelSettings,
  // Close,
  Cloud,
  Settings,
  Storage
} from "@mui/icons-material"
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import React, { FC, MouseEvent, useState } from "react"
import { appBarProps } from "./props"

const ApplicationBar: FC<appBarProps> = ({ ...props }) => {
  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleNotification = () => {
    setAnchorElUser(null)
    router.push("/notificacoes")
  }
  // const handlelogOut = () => {
  //   setAnchorElUser(null)
  //   router.push("/auth")
  // }
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
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            color="inherit"
          >
            <Settings />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
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
              <Typography textAlign="center">Notificações</Typography>
            </MenuItem>
            {/* <MenuItem onClick={handlelogOut}>
              <Close />
              <Typography textAlign="center">Sair</Typography>
            </MenuItem> */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default ApplicationBar
