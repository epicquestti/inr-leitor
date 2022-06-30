import { Newspaper } from "@mui/icons-material"
import { Button, Paper } from "@mui/material"
import { useRouter } from "next/router"
import React, { FC } from "react"
import { boletinsButtonsProps } from "./props"

const BoletinsButtons: FC<boletinsButtonsProps> = ({ ...props }) => {
  const router = useRouter()
  return (
    <Paper sx={{ p: 3 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Newspaper />}
        onClick={() => {
          props.goToBoletins && router.push(props.goToBoletins)
        }}
      >
        Boletins
      </Button>
    </Paper>
  )
}

export default BoletinsButtons
