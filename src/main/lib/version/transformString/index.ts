import { version } from "../types"

const transformString = async (appVersion: string): Promise<version | null> => {
  try {
    if (!appVersion)
      throw new Error("appVersion string can`t be null, empty or undefined.")
    const splitedAppVersion = appVersion.split(".")
    const v = parseInt(splitedAppVersion[0])
    const major = parseInt(splitedAppVersion[1])
    const minor = parseInt(splitedAppVersion[2])
    return {
      v,
      major,
      minor
    }
  } catch (error) {
    return null
  }
}

export default transformString
