import { Delete, Search, Visibility } from "@mui/icons-material"
import {
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, KeyboardEvent, useEffect, useState } from "react"
import { DataGridV2 } from "../../common"
import { favoritosProps } from "./props"

const Favoritos: FC<favoritosProps> = ({ ...props }) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState<string>("")
  const [msg, setMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [list, setList] = useState([])
  const init = () => {
    try {
      setLoading(true)

      window.Main.on("resolveAction", (data: any) => {
        if (data.action === "goTo") {
          router.push(data.url)
        }

        if (data.action === "msg") {
          setMsg(data.message)
          setOpenSnack(true)
          setLoading(false)
        }

        window.Main.send("getFavoriteList", { searchText })
      })

      window.Main.on("reloadFavoritos", (data: any) => {
        setList(data)
        setLoading(false)
        props.loadingView && props.loadingView(false)
      })

      window.Main.send("getFavoriteList", { searchText })
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
      setLoading(false)
    }
  }

  const handleClose = () => {
    setOpenSnack(false)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Paper sx={{ p: 3, background: "#ECEFF1" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6">Favoritos</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <TextField
                disabled={loading}
                fullWidth
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter") {
                    setLoading(true)
                    setTimeout(() => {
                      window.Main.send("getFavoriteList", { searchText })
                    }, 2000)
                  }
                }}
                variant="outlined"
                placeholder="Localize o boletim ou classificador digitando seu número (ex: 11162) ou data (ex: dd/mm/aaaa)"
                label="Localize o boletim ou classificador digitando seu número (ex: 11162) ou data (ex: dd/mm/aaaa)"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <Button
                fullWidth
                disabled={loading}
                variant="contained"
                endIcon={<Search />}
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => {
                    window.Main.send("getFavoriteList", { searchText })
                  }, 2000)
                }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataGridV2
            loading={loading}
            hasActions
            selectable
            sendExtraProp="type"
            actionTrigger={(
              id: number,
              actionName: string,
              sendExtraProp?: string | undefined
            ) => {
              props.loadingView && props.loadingView(true)
              if (actionName === "lookThis") {
                window.Main.send("favoriteAction", {
                  id,
                  type: sendExtraProp,
                  action: "select"
                })
              } else if (actionName === "deleteThis") {
                window.Main.send("favoriteAction", {
                  id,
                  type: sendExtraProp,
                  action: "delete"
                })
              }
            }}
            groupActionTrigger={(list: number[], actionName: string) => {
              props.loadingView && props.loadingView(true)
              if (actionName === "deleteFavorito")
                window.Main.send("removeListFavorite", list)
            }}
            groupActions={[
              {
                icon: "delete",
                name: "deleteFavorito",
                text: "Remover favorito"
              }
            ]}
            actions={[
              {
                text: "Visualisar",
                name: "lookThis",
                icon: <Visibility />
              },
              {
                text: "Remover",
                name: "deleteThis",
                icon: <Delete />
              }
            ]}
            data={list}
            headers={[
              {
                text: "Título",
                attrName: "titulo",
                align: "left",
                width: 8
              },
              {
                text: "Data",
                attrName: "data",
                align: "center",
                width: 2
              }
            ]}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
      />
    </Paper>
  )
}

export default Favoritos
