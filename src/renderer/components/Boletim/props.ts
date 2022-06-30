import { ReactNode } from "react"

type contentsProps = {
  id: number
  text: string
  url: string
  tipo: string
  boletimId: number
}

export type boletimProps = {
  children?: ReactNode
  id: number
  title?: string
  data?: string
  favorite?: () => void
  contents?: contentsProps[]
}
