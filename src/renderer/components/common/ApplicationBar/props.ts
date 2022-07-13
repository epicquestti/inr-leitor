import { ReactNode } from "react"

export type appBarProps = {
  children?: ReactNode
  hasInternet: boolean
  dbIsConnected: boolean
}

export type notifications = {
  id: number
  createdAt: Date
  text: string
  type: string
  readed: boolean
  relatedDocumentId?: number
}
