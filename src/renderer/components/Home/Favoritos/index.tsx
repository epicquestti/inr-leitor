import { Delete, Search, Visibility } from "@mui/icons-material"
import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { FC, KeyboardEvent } from "react"
import { DataGridV2 } from "../../common"
import { favoritosProps } from "./props"

const Favoritos: FC<favoritosProps> = ({ ...props }) => {
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
                placeholder="Localize o boletim ou classificador digitando seu número (ex: 11162) ou data (ex: dd/mm/aaaa)"
                label="Localize o boletim ou classificador digitando seu número (ex: 11162) ou data (ex: dd/mm/aaaa)"
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
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataGridV2
            loading={props.loading}
            hasActions
            selectable
            sendExtraProp="type"
            actionTrigger={(
              id: number,
              actionName: string,
              sendExtraProp?: string | undefined
            ) => {
              console.log(id)
              console.log(actionName)
              console.log(sendExtraProp)
            }}
            groupActionTrigger={(list: number[], actionName: string) => {
              console.log(list, actionName)
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
            data={props.list}
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
    </Paper>
  )
}

export default Favoritos
