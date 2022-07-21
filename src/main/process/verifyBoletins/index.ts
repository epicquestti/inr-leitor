import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import app from "../../config/app"
import { GET, versionTools } from "../../lib"
import getConfigurations from "../getConfigurations"
import processBoletim from "./processBoletim"
import processClassificadores from "./processClassificadores"
import processNotificationsUpdates from "./processNotificationsUpdates"
import processTray from "./processTray"

export default {
  name: "verifyBoletins",
  processListener: false,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      const lastPublishes = await GET(app.api.inr.lastPublishes)
      const appConfig = await getConfigurations.handle(db)

      if (appConfig && lastPublishes) {
        const versionProcessResult = await versionTools.compareVersions(
          data.appVersion,
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

          await processTray(
            data.iconPath,
            beProcessResult,
            clProcessResult,
            data.window
          )
        }

        await processNotificationsUpdates(
          db,
          lastPublishes.version,
          versionProcessResult
        )
      }
    } catch (error: any) {
      console.log("error.message")
    }
  }
}

// const verifyBoletins = async (
//   db: DataSource,
//   iconPath: string,
//   appVersion: string,
//   window?: BrowserWindow
// ) => {
//   try {
//     const lastPublishes = await GET(app.api.inr.lastPublishes)
//     const appConfig = await getConfigurations.handle(db)

//     if (appConfig && lastPublishes) {
//       const versionProcessResult = await versionTools.compareVersions(
//         appVersion,
//         lastPublishes.version
//       )

//       if (versionProcessResult.success) {
//         const beProcessResult = await processBoletim(
//           db,
//           appConfig,
//           lastPublishes
//         )

//         const clProcessResult = await processClassificadores(
//           db,
//           appConfig,
//           lastPublishes
//         )

//         await processTray(iconPath, beProcessResult, clProcessResult, window)
//       }

//       await processNotificationsUpdates(
//         db,
//         lastPublishes.version,
//         versionProcessResult
//       )
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// export default verifyBoletins
