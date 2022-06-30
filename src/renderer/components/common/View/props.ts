import { ReactNode } from "react"

export type viewProps = {
  children?: ReactNode
  loading: boolean
  handleClose?: (loading: boolean) => void
}
