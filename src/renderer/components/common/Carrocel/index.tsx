import { Paper, Typography } from "@mui/material"
import { FC, useState } from "react"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import { PaperImage } from ".."
import { carrocelProps } from "./props"
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Carrocel: FC<carrocelProps> = ({ ...props }) => {
  const [steps, setSteps] = useState(0)
  const changeIndex = (index: number) => {
    setSteps(index)
  }
  return (
    <div style={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        style={{
          position: "relative"
        }}
      >
        <AutoPlaySwipeableViews index={steps} onChangeIndex={changeIndex}>
          {props.items && props.items.length > 0 ? (
            props.items.map((item, index) => (
              <PaperImage
                key={index}
                imgPath={
                  item.tipo === "C"
                    ? "https://inrpublicacoes.com.br/site/img/suplementos/banner.jpg"
                    : "https://inrpublicacoes.com.br/sistema/img_up/1644600470.jpg"
                }
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {item.text}
                </Typography>
              </PaperImage>
            ))
          ) : (
            <PaperImage
              imgPath={
                "https://inrpublicacoes.com.br/sistema/img_up/1644600470.jpg"
              }
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                INR Publicações
              </Typography>
            </PaperImage>
          )}
        </AutoPlaySwipeableViews>
      </Paper>
    </div>
  )
}

export default Carrocel
