/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import {
  ArrowBackIos,
  Close as CloseIcon,
  Home,
  HomeRounded,
  StarBorder
} from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import LogoReading from "../../public/assets/common/Logo-reading-inr.jpg"
import BannerTelegen from "../../public/assets/readingBE/banners/BANNERbeTelegram.jpg"
import BannerCorona from "../../public/assets/readingBE/banners/bannerBE_corona.jpg"
import BannerContabil from "../../public/assets/readingBE/banners/contabil_be_150919.png"
import BannerPcBocardo from "../../public/assets/readingBE/banners/PCBoccardo.gif"
import Juris from "../../public/assets/readingBE/boletim/juris.png"
import Legislacao from "../../public/assets/readingBE/boletim/Legislacao.png"
import MsgEditores from "../../public/assets/readingBE/boletim/msgEditores.png"
import Noticias from "../../public/assets/readingBE/boletim/Noticias.png"
import Opniao from "../../public/assets/readingBE/boletim/Opiniao.png"
import Pareceres from "../../public/assets/readingBE/boletim/Pareceres.png"
import Perguntas from "../../public/assets/readingBE/boletim/Perguntas.png"
import Suplementos from "../../public/assets/readingBE/boletim/Suplementos.png"
import TV from "../../public/assets/readingBE/boletim/tv.png"
import { boletimProps } from "./props"

const Boletim: FC<boletimProps> = ({ ...props }) => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [openSnack, setOpenSnack] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")

  const handleClose = () => {
    setOpenSnack(false)
  }

  const favoriteThisBE = () => {
    props.favorite && props.favorite()
  }

  const openInBrowser = (path?: string) => {
    if (path) window.Main.send("openInBrowser", path)
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
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justifyContent="space-between">
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  startIcon={<ArrowBackIos />}
                  onClick={() => {
                    try {
                      setLoading(true)
                      router.push("/boletins")
                    } catch (error: any) {
                      setMsg(error.message)
                      setOpenSnack(true)
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  voltar
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={() => {
                    try {
                      setLoading(true)
                      router.push("/")
                    } catch (error: any) {
                      setMsg(error.message)
                      setOpenSnack(true)
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  Início
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  startIcon={<StarBorder />}
                  onClick={() => {
                    try {
                      setLoading(true)
                      favoriteThisBE()
                    } catch (error: any) {
                      setMsg(error.message)
                      setOpenSnack(true)
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  Favorito
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <img src={LogoReading.src} width={210} height={93.24} />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Grid container textAlign="end">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="body1" sx={{ color: "#000080" }}>
                      <strong>{props.title}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="body1" sx={{ color: "#000080" }}>
                      <strong>ISSN 1983-1228</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ height: 10 }} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="body1" sx={{ color: "#000080" }}>
                      <strong>{props.data}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* MSGEDITORES */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "MENSAGENSDOSEDITORES").length >
            0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={MsgEditores.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "MENSAGENSDOSEDITORES")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* opniao */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "OPNIAO").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Opniao.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "OPNIAO")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* noticias */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "NOTICIAS").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Noticias.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "NOTICIAS")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* TVINR */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "TVINR").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={TV.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "TVINR")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* JURISPRUDENCIA */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "JURISPRUDENCIA").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Juris.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "JURISPRUDENCIA")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* "LEGISLACAO") */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "LEGISLACAO").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Legislacao.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "LEGISLACAO")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* "PERGUNTAS") */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "PERGUNTAS").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Perguntas.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "PERGUNTAS")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          {/* "SUPLEMENTOS") */}
          {props.contents &&
          props.contents.filter(n => n.tipo === "SUPLEMENTOS").length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Suplementos.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "SUPLEMENTOS")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}

          {/* PARECERESNAOPUBLICADOSPELACGJSP) */}
          {props.contents &&
          props.contents.filter(
            n => n.tipo === "PARECERESNAOPUBLICADOSPELACGJSP"
          ).length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img
                src={Pareceres.src}
                style={{
                  width: "100%",
                  position: "relative",
                  backgroundSize: "cover"
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {props.contents &&
            props.contents.map(item => {
              if (item.tipo === "PARECERESNAOPUBLICADOSPELACGJSP")
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                      <a
                        onClick={() => {
                          openInBrowser(item.url)
                        }}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <strong>{item.text}</strong>
                      </a>
                    </Typography>
                  </Grid>
                )
              else return ""
            })}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <img
                  src={BannerPcBocardo.src}
                  style={{
                    width: "100%",
                    position: "relative",
                    backgroundSize: "cover"
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <img
                  src={BannerTelegen.src}
                  style={{
                    width: "100%",
                    position: "relative",
                    backgroundSize: "cover"
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <img
                  src={BannerCorona.src}
                  style={{
                    width: "100%",
                    position: "relative",
                    backgroundSize: "cover"
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <img
                  src={BannerContabil.src}
                  style={{
                    width: "100%",
                    position: "relative",
                    backgroundSize: "cover"
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container textAlign="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="subtitle2" sx={{ color: "#000080" }}>
                  <strong>
                    Editado por Boletins Informativos Ltda – CNPJ:
                    62.173.406/0001-23
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="subtitle2" sx={{ color: "#000080" }}>
                  <strong>
                    Rua Voluntários da Pátria, 2.468 – 23º andar – CEP 02402-000
                    – Santana – São Paulo / SP
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="subtitle2" sx={{ color: "#000080" }}>
                  <strong>
                    Central do Assinante: (11) 2959 0220 /
                    faleconosco@inr.com.br
                  </strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="caption" sx={{ color: "#000080" }}>
                  <strong>
                    <u>Nota de responsabilidade:</u>
                  </strong>{" "}
                  As opiniões veiculadas neste boletim não expressam
                  necessariamente a opinião do INR. As matérias assinadas são de
                  inteira responsabilidade de quem as subscreveram.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="caption" sx={{ color: "#000080" }}>
                  <strong>
                    <u>Alerta:</u>
                  </strong>{" "}
                  É proibida a reprodução, ainda que parcial, do conteúdo
                  veiculado por meio desta edição, sem menção à fonte (Boletim
                  Eletrônico INR e seu número). Tratando-se de texto opinativo
                  posicionado sob as seções "OPINIÃO", "MENSAGEM DOS EDITORES" e
                  "PERGUNTAS & RESPOSTAS" a reprodução é terminantemente
                  proibida, ainda que autorizada pelo seu autor. Os infratores
                  estão sujeitos às penas previstas na Lei nº 9.610/98, que rege
                  os direitos autorais no Brasil.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justifyContent="space-between">
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  fullWidth
                  disabled={loading}
                  variant="outlined"
                  startIcon={<ArrowBackIos />}
                  onClick={() => router.push("/boletins")}
                >
                  voltar
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  startIcon={<HomeRounded />}
                  onClick={() => router.push("/")}
                >
                  Início
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  startIcon={<StarBorder />}
                  onClick={() => {
                    try {
                      setLoading(true)
                      favoriteThisBE()
                    } catch (error: any) {
                      setMsg(error.message)
                      setOpenSnack(true)
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  Favorito
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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

export default Boletim
