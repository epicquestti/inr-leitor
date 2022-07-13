export type version = {
  v: number
  minor: number
  major: number
}

export type versionRequest = {
  version?: number
  major?: number
  minor?: number
  severity?: string
  link?: string
  vigent?: boolean
}
