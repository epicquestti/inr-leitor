import { Feed } from "@mui/icons-material"
import { Button, Paper } from "@mui/material"
import { useRouter } from "next/router"
import React, { FC } from "react"
import { classificadosButtonsProps } from "./props"

const ClassificadosButton: FC<classificadosButtonsProps> = ({ ...props }) => {
  const router = useRouter()
  return (
    <Paper sx={{ p: 3 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Feed />}
        onClick={() => {
          props.goToClassificados && router.push(props.goToClassificados)
        }}
      >
        Classificadores
      </Button>
    </Paper>
  )
}

export default ClassificadosButton
