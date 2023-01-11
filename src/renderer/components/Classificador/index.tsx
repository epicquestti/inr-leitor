/* eslint-disable @next/next/no-img-element */
import {
  ArrowBackIos,
  Home,
  HomeRounded,
  StarBorder
} from "@mui/icons-material"
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { FC } from "react"
import LogoReading from "../../public/assets/common/Logo-reading-inr.jpg"
import BannerTelegen from "../../public/assets/readingBE/banners/BANNERbeTelegram.jpg"
import BannerCorona from "../../public/assets/readingBE/banners/bannerBE_corona.jpg"
import BannerContabil from "../../public/assets/readingBE/banners/contabil_be_150919.png"
import BannerPcBocardo from "../../public/assets/readingBE/banners/PCBoccardo.gif"
import Pr from "../../public/assets/readingBE/classificadores/PR.png"
import Rs from "../../public/assets/readingBE/classificadores/RS.png"
import Sp from "../../public/assets/readingBE/classificadores/SP.png"
import { classificadoProps } from "./props"

const Classificador: FC<classificadoProps> = ({ ...props }) => {
  const router = useRouter()
  const openInBrowser = (path?: string) => {
    if (path) window.Main.send("openInBrowser", path)
  }
  const favoriteThisClassificador = () => {
    window.Main.send("favoriteThisClassificador", { id: props.id })
  }
  return (
    <Paper sx={{ p: 3 }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justifyContent="space-between">
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ArrowBackIos />}
                  onClick={() => router.push("/classificadores")}
                >
                  voltar
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={() => router.push("/")}
                >
                  Início
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<StarBorder />}
                  onClick={() => {
                    favoriteThisClassificador()
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img
              src={Sp.src}
              style={{
                width: "100%",
                position: "relative",
                backgroundSize: "cover"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="subtitle1">
              Prezado Assinante, temos a satisfação de enviar-lhe os textos dos
              atos de seu interesse, publicados no Diário da Justiça Eletrônico
              do Tribunal de Justiça do Estado de São Paulo.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {props.spAcuUrl && props.spAcuTitle && (
              <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
                <a
                  onClick={() => {
                    openInBrowser(props.spAcuUrl)
                  }}
                  style={{
                    cursor: "pointer"
                  }}
                >
                  <strong>{props.spAcuTitle}</strong>
                </a>
              </Typography>
            )}
            <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
              <a
                onClick={() => {
                  if (props.spUlr !== "NHP" && props.spUlr !== "NHA")
                    openInBrowser(props.spUlr)
                }}
                style={{
                  cursor:
                    props.spUlr !== "NHP" && props.spUlr !== "NHA"
                      ? "pointer"
                      : "not-allowed"
                }}
              >
                <strong>
                  {props.data} –{" "}
                  {props.spUlr !== "NHP" &&
                    props.spUlr !== "NHA" &&
                    "Clique aqui e acesse o conteúdo desta edição."}
                  {props.spUlr === "NHP" &&
                    "Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de São Paulo na data de hoje."}
                  {props.spUlr === "NHA" &&
                    "Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de São Paulo."}
                </strong>
              </a>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1">Atenciosamente,</Typography>
            </Box>
            <Typography variant="subtitle1">
              <strong>Publicações INR</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img
              src={Pr.src}
              style={{
                width: "100%",
                position: "relative",
                backgroundSize: "cover"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="subtitle1">
              Prezado Assinante, temos a satisfação de enviar-lhe os textos dos
              atos de seu interesse, publicados no Diário da Justiça Eletrônico
              do Tribunal de Justiça do Estado do Paraná.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
              <a
                onClick={() => {
                  if (props.prUlr !== "NHP" && props.prUlr !== "NHA")
                    openInBrowser(props.prUlr)
                }}
                style={{
                  cursor:
                    props.prUlr !== "NHP" && props.prUlr !== "NHA"
                      ? "pointer"
                      : "not-allowed"
                }}
              >
                <strong>
                  {props.data} –{" "}
                  {props.prUlr !== "NHP" &&
                    props.prUlr !== "NHA" &&
                    "Clique aqui e acesse o conteúdo desta edição."}
                  {props.prUlr === "NHP" &&
                    "Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná na data de hoje."}
                  {props.prUlr === "NHA" &&
                    "Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná."}
                </strong>
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1">Atenciosamente,</Typography>
            </Box>
            <Typography variant="subtitle1">
              <strong>Publicações INR</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img
              src={Rs.src}
              style={{
                width: "100%",
                position: "relative",
                backgroundSize: "cover"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="subtitle1">
              Prezado Assinante, temos a satisfação de enviar-lhe os textos dos
              atos de seu interesse, publicados no Diário da Justiça Eletrônico
              do Tribunal de Justiça do Estado do Rio Grande do Sul.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="subtitle1" sx={{ color: "#0093d8" }}>
              <a
                onClick={() => {
                  if (props.rsUlr !== "NHP" && props.rsUlr !== "NHA")
                    openInBrowser(props.rsUlr)
                }}
                style={{
                  cursor:
                    props.rsUlr !== "NHP" && props.rsUlr !== "NHA"
                      ? "pointer"
                      : "not-allowed"
                }}
              >
                <strong>
                  <strong>
                    {props.data} –{" "}
                    {props.rsUlr !== "NHP" &&
                      props.rsUlr !== "NHA" &&
                      "Clique aqui e acesse o conteúdo desta edição."}
                    {props.rsUlr === "NHP" &&
                      "Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul na data de hoje."}
                    {props.rsUlr === "NHA" &&
                      "Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul."}
                  </strong>
                </strong>
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1">Atenciosamente,</Typography>
            </Box>
            <Typography variant="subtitle1">
              <strong>Publicações INR</strong>
            </Typography>
          </Grid>
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
                  variant="outlined"
                  startIcon={<ArrowBackIos />}
                  onClick={() => router.push("/classificadores")}
                >
                  voltar
                </Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button
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
                  fullWidth
                  variant="outlined"
                  startIcon={<StarBorder />}
                  onClick={() => {
                    favoriteThisClassificador()
                  }}
                >
                  Favorito
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}

export default Classificador
