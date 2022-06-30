import { ReactNode } from "react"

export type classificadoresProps = {
  children?: ReactNode
}

export type IBoletim = {
  id: number
  title: string
  criadoEm: string
  publicadoEm: string
  read: string
}
