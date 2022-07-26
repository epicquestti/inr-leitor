import { app, IpcMainEvent } from "electron"
import os from "os"
import { DataSource } from "typeorm"
import config from "../../config/app"
import { Configuracoes } from "../../Entities"
import { POST } from "../../lib"

export default {
  name: "sendBugReport",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      const osVersion = os.version()
      const appVersion = app.getVersion()

      const appConfigsrepository = await db.getRepository(Configuracoes)
      const appConfig = await appConfigsrepository.findOneBy({
        id: 1
      })

      const body = {
        os: osVersion,
        version: appVersion,
        appConfig,
        reportType: "APP",
        ...data
      }

      const response = await POST(config.api.inr.sendReport, body)
      if (response.success) {
        event.sender.send("reportBugReload", { success: true })
      } else throw new Error(response.message)
    } catch (error: any) {
      event?.sender.send("reportBugReload", {
        success: false,
        message: error.message
      })
    }
  }
}
