import { app } from "electron"
const isDev = !app.isPackaged
const base = isDev
  ? "https://homolog.publicacoesinr.com.br/api"
  : "https://production.publicacoesinr.com.br/api"
export default {
  api: {
    inr: {
      base,
      lastPublishes: `${base}/last-publishes`,
      boletimAfter: `${base}/publicacoes/boletim/after/`,
      boletim: `${base}/publicacoes/boletim/`,
      classificadorAfter: `${base}/publicacoes/classificador/after/`,
      classificador: `${base}/publicacoes/classificador/`
    }
  }
}
