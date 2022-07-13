import { DataSource } from "typeorm"
import app from "../../../config/app"
import { GET, versionTools } from "../../../lib"
import getConfigurations from "../getConfigurations"
import processBoletim from "./processBoletim"
import processClassificadores from "./processClassificadores"
import processNotificationsUpdates from "./processNotificationsUpdates"
import processTray from "./processTray"
const verifyBoletins = async (
  db: DataSource,
  iconPath: string,
  appVersion: string
) => {
  try {
    const lastPublishes = await GET(app.api.inr.lastPublishes)
    const appConfig = await getConfigurations(db)

    if (appConfig && lastPublishes) {
      const versionProcessResult = await versionTools.compareVersions(
        appVersion,
        lastPublishes.version
      )

      if (versionProcessResult.success) {
        const beProcessResult = await processBoletim(
          db,
          appConfig,
          lastPublishes
        )

        const clProcessResult = await processClassificadores(
          db,
          appConfig,
          lastPublishes
        )

        await processTray(iconPath, beProcessResult, clProcessResult)
      }

      await processNotificationsUpdates(
        db,
        lastPublishes.version,
        versionProcessResult
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export default verifyBoletins
