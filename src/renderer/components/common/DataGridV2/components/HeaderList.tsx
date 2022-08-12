import { Icon, IconButton } from "@mui/material"
import { headerList } from "../types"
import { DefaultHeader } from "./DefaultHeader"
import { LeftCheckHeader } from "./LeftCheckHeader"
import { LeftHeader } from "./LeftHeader"
import { RigthHeader } from "./RigthHeader"

export const HeaderList = (
  list?: headerList[],
  isSelectable?: boolean,
  headerOnChange?: () => void,
  hasAction?: boolean
) => {
  const res: JSX.Element[] | undefined = []

  if (list && list.length > 0) {
    const start = 0
    const end: number = list.length - 1

    for (let i = 0; i < list.length; i++) {
      switch (i) {
        case start:
          if (isSelectable) {
            res.push(
              <LeftCheckHeader key={`header-first-item`}>
                <IconButton size="small" onClick={headerOnChange}>
                  <Icon>more_horiz</Icon>
                </IconButton>
              </LeftCheckHeader>
            )

            res.push(
              <DefaultHeader key={`header-${i}-item`}>
                {list[i].text}
              </DefaultHeader>
            )
          } else {
            res.push(
              <LeftHeader key={`header-${i}-item`}>{list[i].text}</LeftHeader>
            )
          }
          break

        case end:
          if (hasAction) {
            res.push(
              <DefaultHeader key={`header-${i}-item`}>
                {list[i].text}
              </DefaultHeader>
            )
            res.push(
              <RigthHeader key={`header-last-item`} sx={{ width: "3%" }} />
            )
          } else {
            res.push(
              <RigthHeader key={`header-${i}-item`}>{list[i].text}</RigthHeader>
            )
          }
          break

        default:
          res.push(
            <DefaultHeader key={`header-${i}-item`}>
              {list[i].text}
            </DefaultHeader>
          )
          break
      }
    }
  }

  return res
}
