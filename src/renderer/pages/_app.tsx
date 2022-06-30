import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"
import { AppProps } from "next/app"
import { FC } from "react"
import theme from "../style/theme"

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box"
          },
          body: {
            fontSize: "16px",
            fontFamily: "Arial, Helvetica, sans-serif"
          }
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
