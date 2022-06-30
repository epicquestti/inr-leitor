import {
  AccountCircle,
  Bookmark,
  BookmarkBorder,
  Lock,
  Visibility,
  VisibilityOff
} from "@mui/icons-material"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField
} from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, useState } from "react"
import HomeInr from "../../public/assets/common/Logo-reading-inr.jpg"
import { loginBoxProps } from "./props"

const Login: FC<loginBoxProps> = () => {
  const router = useRouter()
  const [showPass, setShowPass] = useState<boolean>(false)

  const changePassVisibility = () => {
    setShowPass(!showPass)
  }
  return (
    <Paper>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={3}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "14px"
            }}
          >
            <img src={HomeInr.src} width={200} height={80} />
          </div>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <TextField
            type="text"
            fullWidth
            id="email"
            label="email"
            // disabled={loading}
            variant="outlined"
            // onChange={setEmailValue}
            // value={email}
            // error={errorControl[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <TextField
            type={showPass ? "text" : "password"}
            fullWidth
            id="pass"
            label="senha"
            variant="outlined"
            // disabled={loading}
            // onChange={setPasswordValue}
            // error={errorControl[1]}
            // value={password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={changePassVisibility}
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid
          item
          xs={11}
          sm={11}
          md={11}
          lg={11}
          xl={11}
          justifyContent="right"
          alignItems="right"
          textAlign="right"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<BookmarkBorder />}
                  checkedIcon={<Bookmark />}
                  // onChange={setKeepConnectedValue}
                  // checked={keepConnected}
                />
              }
              label="Manter conectado"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push("/")}
          >
            Entrar
          </Button>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              boxSizing: "border-box",
              padding: 8
            }}
          >
            <Link href="/recovery-password">Esqueci minha senha</Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Login
