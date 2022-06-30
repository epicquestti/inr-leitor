import { Close as CloseIcon } from "@mui/icons-material"
import { Grid, IconButton, Snackbar } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Boletim, View } from "../../components"

export default function ReadingBoletim() {
  const router = useRouter()
  const { id } = router.query
  const [queryId] = useState<number>(id ? parseInt(id.toString()) : 0)
  const [title, setTitle] = useState("")
  const [data, setData] = useState("")
  const [contents, setContents] = useState([])

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("")

  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    try {
      setLoading(true)
      window.Main.on("realodBoletim", (data: any) => {
        console.log(data)

        setTitle(data.title)
        setData(new Date(data.publicadoEm).toLocaleDateString())
        setContents(data.contents)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })

      window.Main.on("favoriteThisBEResponse", (data: any) => {
        if (data) {
          setTimeout(() => {
            setLoading(false)
          }, 2000)
          setMsg(data.msg)
          setOpen(true)
        }
      })

      window.Main.send("getThisBoletimById", {
        id: queryId
      })
    } catch (error: any) {
      setMsg(error.toString())
      setOpen(true)
    }
  }, [])

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
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
          <Boletim
            id={queryId}
            title={title}
            data={data}
            contents={contents}
            favorite={() => {
              setLoading(true)
              window.Main.send("favoriteThisBE", { id: queryId })
            }}
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
