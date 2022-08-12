import { Typography } from "@mui/material"
import { FC } from "react"
import { PaperImage } from "../.."
import { welcomeProps } from "./props"
const WelcomeBanner: FC<welcomeProps> = ({ ...props }) => {
  return (
    <PaperImage imgPath={props.image}>
      <Typography variant="h5">Seja Bem-vindo ao Leitor INR</Typography>
    </PaperImage>
  )
}

export default WelcomeBanner
