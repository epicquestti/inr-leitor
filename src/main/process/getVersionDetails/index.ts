import { app, IpcMainEvent } from "electron"
import { DataSource } from "typeorm"

export default {
  name: "getVersionDetails",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      const details = {
        success: true,
        version: app.getVersion()
      }

      console.log(details)

      event.sender.send("reloadAbout", details)
    } catch (error: any) {
      event?.sender.send("reloadAbout", { message: error.message })
    }
  }
}
