import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress
} from "@mui/material"
import { indigo } from "@mui/material/colors"
import { Box } from "@mui/system"
import { FC, useEffect, useState } from "react"
import { ApplicationBar } from ".."
import { viewProps } from "./props"

const View: FC<viewProps> = ({ ...props }) => {
  const [dbIsConnected, setDbIsConnected] = useState<boolean>(false)
  const [hasInternet, setHasInternet] = useState<boolean>(false)

  useEffect(() => {
    window.Main.on(
      "checkDbStatusResponse",
      (dbConnected: boolean | undefined) => setDbIsConnected(!!dbConnected)
    )
    window.Main.checkDbStatus()

    setHasInternet(navigator.onLine)
  }, [])
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        padding: 2,
        overflow: "auto",
        flexGrow: 1,
        background: `${indigo[900]}`,
        "::-webkit-scrollbar": {
          width: "10px"
        },
        "::-webkit-scrollbar-thumb": {
          background: "#424242",
          borderRadius: "10px"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#B0BEC5"
        }
      }}
    >
      <ApplicationBar dbIsConnected={dbIsConnected} hasInternet={hasInternet} />
      <div style={{ top: 50, position: "relative", marginBottom: 50 }}>
        {props.children}
        <Dialog onClose={props.handleClose} open={props.loading}>
          <DialogTitle>Por favor aguarde...</DialogTitle>
          <DialogContent>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  )
}

export default View
