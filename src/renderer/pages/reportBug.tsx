import { WhatsApp } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { View } from "../components"
const ReportBug = () => {
  const router = useRouter()
  const [tratamento, setTratamento] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [ddd, setDdd] = useState<number>(0)
  const [fone, setFone] = useState<string>("")
  const [descricao, setDescricao] = useState<string>("")
  const [isWhatsApp, setIsWhatsApp] = useState<boolean>(false)
  const [contactWhats, setContactWhats] = useState<boolean>(false)
  const [contactEmail, setContactEmail] = useState<boolean>(false)
  const [contactLigacao, setContactLigacao] = useState<boolean>(false)
  const [contactNo, setContactNo] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [blockWhatsContact, setBlockWhatsContact] = useState<boolean>(true)
  const [blockAllContacts, setBlockAllContacts] = useState<boolean>(false)

  const [reportBugShow, setReportBugShow] = useState<boolean>(false)
  const [reportBugSuccess, setReportBugSuccess] = useState<boolean>(false)

  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [msg, setMsg] = useState("")
  const [error, setError] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false
  ])

  useEffect(() => {
    window.Main.on("reportBugReload", (data: any) => {
      if (data.success) {
        setTimeout(() => {
          setLoading(false)
          setReportBugSuccess(true)
          setReportBugShow(true)
        }, 2000)
      } else {
        setTimeout(() => {
          setLoading(false)
          setMsg(data.message)
          setOpenSnack(true)
        }, 2000)
      }
    })
  }, [])

  const handleReportBugResult = () => {
    setReportBugShow(false)
  }

  const handleClose = () => {
    setOpenSnack(false)
  }

  const mascaraTelefone = (v: string) => {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d)(\d{4})$/, "$1-$2")
    return v
  }

  const handleCloseDialog = async () => {
    setLoading(false)
  }

  const sendBugReport = () => {
    try {
      if (!tratamento) {
        const tmp = [...error]
        tmp[0] = true
        setError(tmp)
        throw new Error("Favor preencha o campo Tratamento.")
      }

      if (!nome) {
        const tmp = [...error]
        tmp[1] = true
        setError(tmp)
        throw new Error("Favor preencha o campo Nome.")
      }

      if (!email) {
        const tmp = [...error]
        tmp[2] = true
        setError(tmp)
        throw new Error("Favor preencha o campo email.")
      }

      if (ddd === 0) {
        const tmp = [...error]
        tmp[3] = true
        setError(tmp)
        throw new Error("Favor preencha o campo Ddd.")
      }

      if (!fone) {
        const tmp = [...error]
        tmp[4] = true
        setError(tmp)
        throw new Error("Favor preencha o campo Telefone.")
      }

      if (!contactNo) {
        if (!contactWhats && !contactEmail && !contactLigacao) {
          throw new Error(
            `Favor selecione um meio de contato ou então "não quero ser contactado". caso whatsapp seja uma de suas opções selecione a opção "O número esta no whatsapp" para habilitar a opção de contato por whatsapp.`
          )
        }
      }

      if (!descricao) {
        const tmp = [...error]
        tmp[5] = true
        setError(tmp)
        throw new Error("Favor descreve o bug/problema a ser reportado.")
      }

      const body = {
        tratamento,
        nome,
        email,
        ddd,
        fone,
        isWhats: isWhatsApp,
        contactWhats,
        contactEmail,
        contactLigacao,
        contactNo,
        descricao
      }

      setLoading(true)
      window.Main.send("sendBugReport", body)
    } catch (error: any) {
      setMsg(error.message)
      setOpenSnack(true)
      setLoading(false)
      return
    }
  }

  return (
    <View loading={false}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ p: 3, background: "#ECEFF1" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                <Typography variant="h5">Reporte um bug</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    router.push("/")
                  }}
                >
                  voltar
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{ fontSize: 14 }}>
                  Campos com (*) são obrigatórios
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-tratamento-id">
                    Tratamento *
                  </InputLabel>
                  <Select
                    error={error[0]}
                    disabled={loading}
                    labelId="select-tratamento-id"
                    fullWidth
                    label="Tratamento *"
                    value={tratamento}
                    onChange={(event: SelectChangeEvent<string>) => {
                      const tmp = [...error]
                      tmp[0] = false
                      setError(tmp)
                      setTratamento(event.target.value)
                    }}
                  >
                    <MenuItem value={""}>Selecione</MenuItem>
                    <MenuItem value={"Sr"}>Sr</MenuItem>
                    <MenuItem value={"Sra"}>Sra</MenuItem>
                    <MenuItem value={"Srta"}>Srta</MenuItem>
                    <MenuItem value={"Dr"}>Dr</MenuItem>
                    <MenuItem value={"Dra"}>Dra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  error={error[1]}
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  label="Nome (completo) *"
                  inputProps={{ maxLength: 100 }}
                  value={nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const tmp = [...error]
                    tmp[1] = false
                    setError(tmp)
                    setNome(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TextField
                  error={error[2]}
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  value={email}
                  label="Email *"
                  inputProps={{ maxLength: 100 }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const tmp = [...error]
                    tmp[2] = false
                    setError(tmp)
                    setEmail(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                <FormControl fullWidth>
                  <InputLabel id="select-tratamento-id">DDD *</InputLabel>
                  <Select
                    error={error[3]}
                    disabled={loading}
                    labelId="select-tratamento-id"
                    fullWidth
                    label="DDD *"
                    value={ddd}
                    onChange={(event: SelectChangeEvent<number>) => {
                      const tmp = [...error]
                      tmp[3] = false
                      setError(tmp)
                      setDdd(parseInt(event.target.value.toString()))
                    }}
                  >
                    <MenuItem value={0}>Selecione</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={17}>17</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={27}>27</MenuItem>
                    <MenuItem value={28}>28</MenuItem>
                    <MenuItem value={31}>31</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                    <MenuItem value={33}>33</MenuItem>
                    <MenuItem value={34}>34</MenuItem>
                    <MenuItem value={35}>35</MenuItem>
                    <MenuItem value={37}>37</MenuItem>
                    <MenuItem value={38}>38</MenuItem>
                    <MenuItem value={41}>41</MenuItem>
                    <MenuItem value={42}>42</MenuItem>
                    <MenuItem value={43}>43</MenuItem>
                    <MenuItem value={44}>44</MenuItem>
                    <MenuItem value={45}>45</MenuItem>
                    <MenuItem value={46}>46</MenuItem>
                    <MenuItem value={47}>47</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                    <MenuItem value={49}>49</MenuItem>
                    <MenuItem value={51}>51</MenuItem>
                    <MenuItem value={53}>53</MenuItem>
                    <MenuItem value={54}>54</MenuItem>
                    <MenuItem value={55}>55</MenuItem>
                    <MenuItem value={61}>61</MenuItem>
                    <MenuItem value={62}>62</MenuItem>
                    <MenuItem value={63}>63</MenuItem>
                    <MenuItem value={64}>64</MenuItem>
                    <MenuItem value={65}>65</MenuItem>
                    <MenuItem value={66}>66</MenuItem>
                    <MenuItem value={67}>67</MenuItem>
                    <MenuItem value={68}>68</MenuItem>
                    <MenuItem value={69}>69</MenuItem>
                    <MenuItem value={71}>71</MenuItem>
                    <MenuItem value={73}>73</MenuItem>
                    <MenuItem value={74}>74</MenuItem>
                    <MenuItem value={75}>75</MenuItem>
                    <MenuItem value={77}>77</MenuItem>
                    <MenuItem value={79}>79</MenuItem>
                    <MenuItem value={81}>81</MenuItem>
                    <MenuItem value={82}>82</MenuItem>
                    <MenuItem value={83}>83</MenuItem>
                    <MenuItem value={84}>84</MenuItem>
                    <MenuItem value={85}>85</MenuItem>
                    <MenuItem value={86}>86</MenuItem>
                    <MenuItem value={87}>87</MenuItem>
                    <MenuItem value={88}>88</MenuItem>
                    <MenuItem value={89}>89</MenuItem>
                    <MenuItem value={91}>91</MenuItem>
                    <MenuItem value={92}>92</MenuItem>
                    <MenuItem value={93}>93</MenuItem>
                    <MenuItem value={94}>94</MenuItem>
                    <MenuItem value={95}>95</MenuItem>
                    <MenuItem value={96}>96</MenuItem>
                    <MenuItem value={97}>97</MenuItem>
                    <MenuItem value={98}>98</MenuItem>
                    <MenuItem value={99}>99</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <TextField
                  error={error[4]}
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  value={fone}
                  label="Telefone *"
                  inputProps={{ maxLength: 10 }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const tmp = [...error]
                    tmp[4] = false
                    setError(tmp)
                    setFone(mascaraTelefone(e.target.value))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "180px",
                    background: "#CFD8DC",
                    borderRadius: "4px",
                    padding: 2
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={blockAllContacts || loading}
                        checked={isWhatsApp}
                        onChange={(
                          _: ChangeEvent<HTMLInputElement>,
                          checked: boolean
                        ) => {
                          setIsWhatsApp(checked)

                          if (!checked) {
                            setContactWhats(false)
                            setBlockWhatsContact(true)
                          } else {
                            setBlockWhatsContact(false)
                          }
                        }}
                        icon={<WhatsApp />}
                        checkedIcon={<WhatsApp sx={{ color: "green" }} />}
                      />
                    }
                    labelPlacement="top"
                    label="O número esta no whatsapp ?"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle2">
                      Caso haja necessidade de contato, como você gostaria de
                      ser contactado ? *
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={
                            blockWhatsContact || blockAllContacts || loading
                          }
                          checked={contactWhats}
                          onChange={(
                            _: ChangeEvent<HTMLInputElement>,
                            checked: boolean
                          ) => {
                            setContactWhats(checked)
                          }}
                        />
                      }
                      label="Whatsapp"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={blockAllContacts || loading}
                          checked={contactEmail}
                          onChange={(
                            _: ChangeEvent<HTMLInputElement>,
                            checked: boolean
                          ) => {
                            setContactEmail(checked)
                          }}
                        />
                      }
                      label="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={blockAllContacts || loading}
                          checked={contactLigacao}
                          onChange={(
                            _: ChangeEvent<HTMLInputElement>,
                            checked: boolean
                          ) => {
                            setContactLigacao(checked)
                          }}
                        />
                      }
                      label="Ligação telefônica"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={loading}
                          checked={contactNo}
                          onChange={(
                            _: ChangeEvent<HTMLInputElement>,
                            checked: boolean
                          ) => {
                            setContactNo(checked)
                            if (checked) {
                              setContactLigacao(false)
                              setContactEmail(false)
                              setContactWhats(false)
                              setIsWhatsApp(false)
                              setBlockAllContacts(true)
                            } else {
                              setBlockAllContacts(false)
                              setBlockWhatsContact(true)
                            }
                          }}
                        />
                      }
                      label="Não quero ser contactado."
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  disabled={loading}
                  error={error[5]}
                  fullWidth
                  multiline
                  minRows={10}
                  maxRows={80}
                  variant="outlined"
                  label="Descreva o bug *"
                  value={descricao}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const tmp = [...error]
                    tmp[5] = false
                    setError(tmp)
                    setDescricao(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  onClick={sendBugReport}
                >
                  Reportar o bug
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog onClose={handleCloseDialog} open={loading}>
        <DialogTitle>Por favor aguarde...</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleReportBugResult} open={reportBugShow}>
        <DialogTitle>
          {reportBugSuccess ? "Sucesso" : "Houve um erro..."}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            {reportBugSuccess ? (
              <Typography variant="body1">
                O Bug foi reportado com sucesso. Agradecemos por seu tempo
              </Typography>
            ) : (
              <Typography variant="body1">
                Houve um erro ao enviar o bug. Por favor, tente novamente mais
                tarde.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              router.push("/")
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={8000}
        onClose={handleClose}
        message={msg}
      />
    </View>
  )
}

export default ReportBug
