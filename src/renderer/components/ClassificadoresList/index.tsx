import { Close as CloseIcon, Search } from "@mui/icons-material"
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import DataGrid from "../common/DataGrid"
import { classificadoresProps } from "./props"

const ClassificadoresList: FC<classificadoresProps> = ({ ...props }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [classificadorList, setClassificadorList] = useState([])

  const [text, setText] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [count, setCount] = useState<number>(0)

  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")

  async function getProps() {
    if (!router.isReady) return

    setLoading(true)
    window.Main.on("realodClassificadoresList", (data: any) => {
      if (data) {
        setCount(data.count)
        setClassificadorList(data.data)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })

    window.Main.send("getClassificadoresList", {
      text,
      limit: rowsPerPage,
      page
    })
  }

  useEffect(() => {
    try {
      getProps()
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
    } finally {
      setLoading(false)
    }
  }, [router.isReady])

  const makeSearch = () => {
    setLoading(true)
    window.Main.send("getClassificadoresList", {
      text,
      limit: rowsPerPage,
      page
    })
  }

  const handlePageChange = async (value: number) => {
    setPage(value)
    window.Main.send("getClassificadoresList", {
      text,
      limit: rowsPerPage,
      page: value
    })
  }

  const handleRowsPerPage = async (value: number) => {
    setRowsPerPage(value)
    window.Main.send("getClassificadoresList", { text, limit: value, page })
  }

  const handleClose = () => {
    setOpenSnack(false)
  }

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
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <Typography variant="h5">Classificadores</Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          <Button
            disabled={!!(loading || props.loading)}
            onClick={() => {
              router.push("/")
            }}
            fullWidth
          >
            Voltar
          </Button>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <TextField
            fullWidth
            disabled={!!(loading || props.loading)}
            variant="outlined"
            placeholder="Busque classificador por nº ou data"
            onChange={e => {
              setText(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Button
            disabled={!!(loading || props.loading)}
            endIcon={<Search />}
            fullWidth
            variant="contained"
            onClick={() => {
              makeSearch()
            }}
          >
            Buscar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataGrid
            gridHeaders={[
              { field: "title", headerName: "Título" },
              {
                field: "read",
                headerName: "Estado",
                tag: {
                  trueCase: {
                    text: "Lido",
                    color: "#81C784",
                    colorText: "#000000"
                  },
                  falseCase: {
                    text: "Ñ Lido",
                    color: "#FFCC80",
                    colorText: "#000000"
                  }
                }
              },
              { field: "criadoEm", headerName: "Data" }
            ]}
            count={count}
            gridData={classificadorList}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPage}
            loading={!!(loading || props.loading)}
            onSelectedRow={id => {
              try {
                setLoading(true)
                router.push(`/classificador/${id}`)
              } catch (error: any) {
                setMsg(error.message)
                setOpenSnack(true)
              } finally {
                setLoading(false)
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid container spacing={3} justifyContent="flex-end">
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Button
                disabled={!!(loading || props.loading)}
                onClick={() => {
                  router.push("/")
                }}
                fullWidth
              >
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </Paper>
  )
}

export default ClassificadoresList
