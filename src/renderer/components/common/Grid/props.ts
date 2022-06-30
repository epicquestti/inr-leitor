import { ReactNode } from "react"

export type header = {
  name: string
  size: number
  align?: "left" | "right" | "center"
}

export type gridProps = {
  children?: ReactNode
  headers?: header[]
  loading?: boolean
}

export type styledTableCotainerProps = {
  children?: ReactNode
}

export type loadingBoxProps = {
  children?: ReactNode
  size?: number
}
