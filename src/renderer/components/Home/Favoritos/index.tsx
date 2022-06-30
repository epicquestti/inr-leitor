import { Delete, Search, Visibility } from "@mui/icons-material"
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, KeyboardEvent } from "react"
import { favoritosProps } from "./props"

const Favoritos: FC<favoritosProps> = ({ ...props }) => {
  const router = useRouter()

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
                disabled={props.loading}
                fullWidth
                value={props.searchText}
                onChange={e =>
                  props.setSearchText && props.setSearchText(e.target.value)
                }
                onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter")
                    props.searchFavorite && props.searchFavorite()
                }}
                variant="outlined"
                placeholder="Localize o boletim ou classificador digitando seu número ou data"
                label="Localizar boletim ou classificador marcado como favorito."
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <Button
                fullWidth
                disabled={props.loading}
                variant="contained"
                endIcon={<Search />}
                onClick={() => {
                  props.searchFavorite && props.searchFavorite()
                }}
              >
                Localizar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableContainer
            sx={{
              maxHeight: 260,
              marginBottom: 3
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell align="center">Data</TableCell>
                  <TableCell align="center">Vizualizar</TableCell>
                  <TableCell align="center">Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.list && props.list.length > 0 ? (
                  props.list.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.titulo}</TableCell>
                      <TableCell align="center">
                        {new Date(item.data).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            if (item.type === "C")
                              router.push(`/classificador/${item.id}`)
                            else if (item.type === "B")
                              router.push(`/boletim/${item.id}`)
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            window.Main.send("removeThisFavorite", {
                              id: item.id,
                              type: item.type
                            })
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Clique em buscar para ver seus Favoritos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Favoritos
