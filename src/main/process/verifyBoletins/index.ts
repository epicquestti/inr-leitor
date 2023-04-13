import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import app from "../../config/app"
import { Notificacoes } from "../../Entities"
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
    data?: any,
    notifyAppUser?: boolean
  ): Promise<void> => {
    try {
      const lastPublishes = await GET(app.api.inr.lastPublishes)
      const appConfig = await getConfigurations.handle(db)

      console.log(app.api.inr.lastPublishes)

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

          if (notifyAppUser) {
            if (!beProcessResult.notify && !clProcessResult.notify) {
              event.sender.send("clientVerifyBoletinsResponse", {
                message:
                  "Não existem novos boletins. Aguarde, em bereve novos conteúdos estarão disponíveis"
              })
            }
          }

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

      const notificacoesQueryBuilder = await db
        .getRepository(Notificacoes)
        .createQueryBuilder("notificacoes")

      const notificationList = await notificacoesQueryBuilder
        .orderBy("notificacoes.createdAt", "DESC")
        .take(10)
        .getMany()

      const notificationCount = await notificacoesQueryBuilder
        .where("notificacoes.readed = :readed", {
          readed: false
        })
        .getCount()

      data.window.webContents.send("reloadNotificationList", {
        success: true,
        data: {
          notificationList,
          notificationCount: notificationCount
        }
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}
