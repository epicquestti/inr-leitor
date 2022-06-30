// const base = "https://homolog.publicacoesinr.com.br/api"
const base = "https://production.publicacoesinr.com.br/api"

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
