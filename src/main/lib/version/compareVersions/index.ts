import transformString from "../transformString"
import { versionRequest } from "../types"

const compareVersions = async (
  appVersion: string,
  versionRequest: versionRequest
): Promise<{
  success: boolean
  needUpdate?: boolean
  mandatory?: boolean
  message?: string
  log?: boolean
}> => {
  try {
    const { v, major, minor } = await transformString(appVersion)

    if (
      versionRequest.version === null ||
      versionRequest.version === undefined ||
      typeof versionRequest.version !== "number"
    )
      return {
        success: false,
        message: "Sem version presente na requisição.",
        log: true
      }

    if (
      versionRequest.major === null ||
      versionRequest.major === undefined ||
      typeof versionRequest.major !== "number"
    )
      return {
        success: false,
        message: "Sem major presente na requisição.",
        log: true
      }

    if (
      versionRequest.minor === null ||
      versionRequest.minor === undefined ||
      typeof versionRequest.minor !== "number"
    )
      return {
        success: false,
        message: "Sem minor presente na requisição.",
        log: true
      }

    let needUpdateForVersion = false

    if (v < versionRequest.version) needUpdateForVersion = true
    if (major < versionRequest.major) needUpdateForVersion = true
    if (minor < versionRequest.minor) needUpdateForVersion = true

    if (needUpdateForVersion)
      if (versionRequest.severity === "urgent")
        return {
          success: false,
          needUpdate: true,
          mandatory: true,
          message:
            "Você esta usando uma versão desatualizada do Leitor INR que ja não póde receber mais atualizações. Atualize para normalizar."
        }
      else
        return {
          success: true,
          needUpdate: true,
          mandatory: false,
          message:
            "Você esta usando uma versão desatualizada do Leitor INR. Considere atualizar."
        }
    else
      return {
        success: true,
        needUpdate: false,
        mandatory: false,
        message: ""
      }
  } catch (error) {
    return {
      success: false,
      needUpdate: false,
      mandatory: false,
      message: error.message
    }
  }
}

export default compareVersions
