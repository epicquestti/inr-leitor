import { ReactNode } from "react"

export type favoritosProps = {
  children?: ReactNode
  list?: any[]
  loading?: boolean
  searchText: string
  setSearchText?: (value: string) => void
  setType?: (value: string) => void
  searchFavorite?: () => void
  stopLoading?: () => void
}
