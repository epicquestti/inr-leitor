import { ReactNode } from "react"

export type favoritosProps = {
  children?: ReactNode
  loading?: boolean
  loadingView?: (loading: boolean) => void
}
