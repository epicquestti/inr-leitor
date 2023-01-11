import { Close } from "@mui/icons-material"
import { Button, Grid, IconButton, Snackbar } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Classificador, View } from "../../components"

const ReadingClassificador = () => {
  const router = useRouter()
  const { id } = router.query
  const idParsed: number = id ? parseInt(id.toString()) : 0
  const [title, setTitle] = useState("")
  const [data, setData] = useState("")
  const [spUrl, setSpUrl] = useState("")
  const [spAcuUrl, setSpAcuUrl] = useState("")
  const [spAcuTitle, setSpAcuTitle] = useState("")
  const [prUrl, setPrUrl] = useState("")
  const [rsUrl, setRsUrl] = useState("")

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("")

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    try {
      setLoading(true)

      window.Main.on("relaodClassificador", (data: any) => {
        setTitle(data.title)

        setData(new Date(data.publicadoEm).toLocaleDateString())

        for (let i = 0; i < data.contents.length; i++) {
          if (data.contents[i].tipo === "SP-ACU") {
            setSpAcuTitle(data.contents[i].text)
            setSpAcuUrl(data.contents[i].url)
          }

          if (data.contents[i].tipo === "SP") {
            setSpUrl(data.contents[i].url)
          } else if (data.contents[i].tipo === "SP-NHP") {
            setSpUrl("NHP")
          } else if (data.contents[i].tipo === "SP-NHA") {
            setSpUrl("NHA")
          }

          if (data.contents[i].tipo === "PR") {
            setPrUrl(data.contents[i].url)
          } else if (data.contents[i].tipo === "PR-NHP") {
            setPrUrl("NHP")
          } else if (data.contents[i].tipo === "PR-NHA") {
            setPrUrl("NHA")
          }

          if (data.contents[i].tipo === "RS") {
            setRsUrl(data.contents[i].url)
          } else if (data.contents[i].tipo === "RS-NHP") {
            setRsUrl("NHP")
          } else if (data.contents[i].tipo === "RS-NHA") {
            setRsUrl("NHA")
          }
        }

        window.Main.send("getNotificationList")

        setTimeout(() => {
          setLoading(false)
        }, 1500)
      })

      window.Main.on("favoriteThisClassificadorResponse", (data: any) => {
        if (data) {
          setMsg(data.msg)
          setOpen(true)
        }
      })

      window.Main.send("getClassificadorById", { id: idParsed })
    } catch (error: any) {
      setMsg(error.toString())
      setOpen(true)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }, [])

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        fechar
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <View
      loading={loading}
      handleClose={() => {
        setLoading(false)
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Classificador
            id={idParsed}
            title={title}
            data={data}
            spAcuTitle={spAcuTitle}
            spAcuUrl={spAcuUrl}
            spUlr={spUrl}
            prUlr={prUrl}
            rsUlr={rsUrl}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </View>
  )
}

export default ReadingClassificador
