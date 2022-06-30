/* eslint-disable no-use-before-define */
import {
  Box,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import React, { FC, ReactNode } from "react"

type tagCaseDefinition = {
  text?: string
  color?: string
  colorText?: string
}

type tagDefinition = {
  trueCase?: tagCaseDefinition
  falseCase?: tagCaseDefinition
}

type headerDef = {
  field: string
  headerName: string
  align?: "center" | "left" | "right" | "justify"
  relation?: string
  tag?: tagDefinition
}

type DataGridoptions = {
  children?: ReactNode
  count?: number
  page?: number
  rowsPerPage?: number
  dense?: boolean
  gridHeaders?: headerDef[]
  gridData?: any[]
  hideHeaders?: boolean
  hidePagination?: boolean
  rowsPerPageOptions?: number[]
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  onSelectedRow?: (id: number) => void
  loading?: boolean
  maxHeigthBody?: number
}

const DataGrid: FC<DataGridoptions> = ({ ...props }) => {
  const rnd = function getRndInteger(): number {
    return Math.floor(Math.random() * (9999 - 1 + 1)) + 1
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableContainer
            sx={{
              border: "1px solid rgb(224, 224, 224)",
              maxHeight: props.maxHeigthBody ? props.maxHeigthBody : "auto"
            }}
          >
            <Table size={props.dense ? "small" : "medium"}>
              {!props.hideHeaders && (
                <TableHead>
                  <TableRow>
                    {props.gridHeaders ? (
                      props.gridHeaders.map(header => (
                        <TableCell
                          key={`${header.headerName}-${rnd()}`}
                          align={header.align ? header.align : "left"}
                        >
                          {header.headerName}
                        </TableCell>
                      ))
                    ) : (
                      <TableCell align="center">
                        Headers null or undefinied
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {props.loading ? (
                  <TableRow
                    sx={{
                      height: "13.8vw"
                    }}
                  >
                    <TableCell
                      align="center"
                      colSpan={props.gridHeaders?.length}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="body1">
                            Carregando... Por favor aguarde.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            alignContent="center"
                            alignItems="center"
                          >
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                              <LinearProgress />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ) : props.gridData && props.gridData.length > 0 ? (
                  props.gridData.map((gridDataItem, gridDataIndex) => (
                    <TableRow
                      key={gridDataIndex + "data" + rnd()}
                      onClick={() => {
                        if (props.onSelectedRow)
                          props.onSelectedRow(gridDataItem.id)
                      }}
                      hover
                    >
                      {props.gridHeaders &&
                        props.gridHeaders.map(
                          (gridHeaderItem, gridHeaderIndex) => (
                            <TableCell
                              sx={{
                                cursor: "pointer"
                              }}
                              align={
                                gridHeaderItem.align
                                  ? gridHeaderItem.align
                                  : "left"
                              }
                              key={gridHeaderIndex + "dataII" + rnd()}
                            >
                              {gridHeaderItem.relation ? (
                                gridDataItem[gridHeaderItem.relation] ? (
                                  gridDataItem[gridHeaderItem.relation][
                                    gridHeaderItem.field
                                  ]
                                ) : (
                                  ""
                                )
                              ) : gridHeaderItem.tag ? (
                                gridDataItem.read === "S" ? (
                                  <Box
                                    sx={{
                                      maxWidth: "60%",
                                      display: "flex",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      borderRadius: 2,
                                      p: 0.5,
                                      m: 0,
                                      color:
                                        gridHeaderItem.tag.trueCase?.colorText,
                                      background:
                                        gridHeaderItem.tag.trueCase?.color
                                    }}
                                  >
                                    <Typography variant="caption">
                                      {gridHeaderItem.tag.trueCase?.text}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      maxWidth: "60%",
                                      display: "flex",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      borderRadius: 2,
                                      p: 0.5,
                                      m: 0,
                                      color:
                                        gridHeaderItem.tag.falseCase?.colorText,
                                      background:
                                        gridHeaderItem.tag.falseCase?.color
                                    }}
                                  >
                                    <Typography variant="caption">
                                      {gridHeaderItem.tag.falseCase?.text}
                                    </Typography>
                                  </Box>
                                )
                              ) : (
                                gridDataItem[gridHeaderItem.field]
                              )}
                            </TableCell>
                          )
                        )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{
                      height: props.dense ? "10vw" : "13.8vw"
                    }}
                  >
                    <TableCell
                      align="center"
                      colSpan={props.gridHeaders?.length}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="body1">
                            Sem dados a serem exibidos. :(
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {!props.hidePagination ? (
              props.loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    paddingRight: "10px",
                    justifyContent: "right",
                    alignItems: "center",
                    height: "2.8vw"
                  }}
                >
                  <Typography variant="subtitle1">Aguarde...</Typography>
                </div>
              ) : (
                <TablePagination
                  component="div"
                  count={props.count ? props.count : 0}
                  page={props.page ? props.page : 0}
                  rowsPerPage={props.rowsPerPage ? props.rowsPerPage : 0}
                  rowsPerPageOptions={
                    props.rowsPerPageOptions
                      ? props.rowsPerPageOptions
                      : [5, 10, 15, 20, 30, 40]
                  }
                  labelRowsPerPage="Registros por página"
                  labelDisplayedRows={({ from, to, count }) => {
                    return `${from}-${to} de ${count !== -1 ? count : to}`
                  }}
                  onRowsPerPageChange={e => {
                    if (props.onRowsPerPageChange)
                      props.onRowsPerPageChange(parseInt(e.target.value, 10))
                  }}
                  onPageChange={(
                    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
                    page: number
                  ) => {
                    if (props.onPageChange) props.onPageChange(page)
                  }}
                />
              )
            ) : (
              ""
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default DataGrid
