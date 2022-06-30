import { ReactNode } from "react"

export type appBarProps = {
  children?: ReactNode
  hasInternet: boolean
  dbIsConnected: boolean
}
