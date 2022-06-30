import {
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import React, { FC } from "react"
import { gridProps, loadingBoxProps, styledTableCotainerProps } from "./props"

const StyledTableCotainer: FC<styledTableCotainerProps> = ({ ...props }) => (
  <TableContainer
    sx={{
      maxHeight: 450,
      marginBottom: 3,
      "::-webkit-scrollbar": {
        width: "10px"
      },
      "::-webkit-scrollbar-track": {
        borderRadius: "10px"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#424242",
        borderRadius: "10px"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#B0BEC5"
      }
    }}
  >
    {props.children}
  </TableContainer>
)

const LoadingBox: FC<loadingBoxProps> = ({ ...props }) => (
  <TableRow
    sx={{
      height: 350
    }}
  >
    <TableCell align="center" colSpan={props.size}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={12}>
          <Skeleton variant="text" height={40} />
        </Grid>
        <Grid item md={12}>
          <Skeleton variant="text" height={40} />
        </Grid>
        <Grid item md={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Grid item md={5}>
              <Grid container>
                <Grid item md={12}>
                  <Skeleton variant="text" height={40} />
                </Grid>
                <Grid item md={12}>
                  <Skeleton variant="text" height={40} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={2}>
              <Typography variant="body1">CARREGANDO...</Typography>
            </Grid>
            <Grid item md={5}>
              <Grid container>
                <Grid item md={12}>
                  <Skeleton variant="text" height={40} />
                </Grid>
                <Grid item md={12}>
                  <Skeleton variant="text" height={40} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Skeleton variant="text" height={40} />
        </Grid>
        <Grid item md={12}>
          <Skeleton variant="text" height={40} />
        </Grid>
      </Grid>
    </TableCell>
  </TableRow>
)

const GridApp: FC<gridProps> = ({ ...props }) => {
  return (
    <StyledTableCotainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {props.headers &&
              props.headers.map((item, index) => (
                <TableCell
                  key={index}
                  width={`${item.size}%`}
                  align={item.align ? item.align : "left"}
                >
                  {item.name}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.loading ? (
            <LoadingBox size={props.headers?.length} />
          ) : (
            props.children
          )}
        </TableBody>
      </Table>
    </StyledTableCotainer>
  )
}

export default GridApp
