import { Box, Grid, Paper } from "@mui/material"
import React, { FC } from "react"
import { paperImageProps } from "./props"

const PaperImage: FC<paperImageProps> = ({ ...props }) => {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        borderRadius: 0,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${props.imgPath})`
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: props.clean ? "rgba(0,0,0,0)" : "rgba(0,0,0,.7)"
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              minHeight: 220,
              padding: 3
            }}
          >
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PaperImage
