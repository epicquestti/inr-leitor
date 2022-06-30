import { Typography } from "@mui/material"
import React, { FC } from "react"
import { PaperImage } from "../.."
import { welcomeProps } from "./props"
const WelcomeBanner: FC<welcomeProps> = ({ ...props }) => {
  return (
    <PaperImage imgPath={props.image}>
      <Typography variant="h4">Seja Bem vindo</Typography>
      <Typography variant="caption">
        Seja bem vindo ao Aplicativo INR Publicações
      </Typography>
    </PaperImage>
  )
}

export default WelcomeBanner
