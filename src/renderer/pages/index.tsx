import { Grid, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import InrBannerHome from "../../renderer/public/assets/common/home-inr.svg"
import {
  BoletinsButtons,
  Carrocel,
  ClassificadosButtons,
  Favoritos,
  View,
  WelcomeBanner
} from "../components"

type cItensType = {
  text: string
  url: string
  tipo: string
}

const Home = () => {
  const [carrourcelItens, setCarrourcelItens] = useState<cItensType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [list, setList] = useState([])
  const [searchText, setSearchText] = useState("")
  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [msg, setMsg] = useState("")
  const [type, setType] = useState("B")

  const handleClose = () => {
    setOpenSnack(false)
  }

  const init = () => {
    try {
      setLoading(true)
      window.Main.on("refreshCarroucel", (data: any) => {
        let newResult = [...carrourcelItens]
        if (data.classificador) {
          for (let c = 0; c < data.classificador.length; c++) {
            newResult = [
              ...newResult,
              {
                text: data.classificador[c].title,
                url: "/classificadores",
                tipo: "C"
              }
            ]
          }
        }

        if (data.boletin) {
          for (let b = 0; b < data.boletin.length; b++) {
            newResult = [
              ...newResult,
              {
                text: data.boletin[b].title,
                url: "/boletim",
                tipo: "B"
              }
            ]
          }
        }
        setCarrourcelItens(newResult)
      })

      window.Main.on("reloadFavoritos", (data: any) => {
        setList(data)
        setLoading(false)
      })

      window.Main.on("reloadRemoveThisFavorite", (data: any) => {
        setOpenSnack(true)
        setMsg(data.msg)
        setList(data.response)
        setLoading(false)
      })

      window.Main.send("initiCarrourcel")
      window.Main.send("getFavoriteList")
      window.Main.send("getNotificationList")
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <View
      loading={loading}
      handleClose={() => {
        setLoading(false)
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <WelcomeBanner image={InrBannerHome.src} />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Carrocel items={carrourcelItens} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ClassificadosButtons goToClassificados="/classificadores" />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <BoletinsButtons goToBoletins="/boletins" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Favoritos
            list={list}
            loading={loading}
            searchText={searchText}
            setSearchText={(value: string) => setSearchText(value)}
            setType={(value: string) => {
              setType(value)
            }}
            stopLoading={() => {
              setLoading(false)
            }}
            searchFavorite={() => {
              setLoading(true)

              setTimeout(() => {
                window.Main.send("getFavoriteList", { type: type, searchText })
              }, 2000)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
      </Grid>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
      />
    </View>
  )
}

export default Home
