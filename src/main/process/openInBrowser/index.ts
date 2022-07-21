import { IpcMainEvent, shell } from "electron"
import { DataSource } from "typeorm"

export default {
  name: "openInBrowser",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      await shell.openExternal(data)
    } catch (error: any) {
      event?.sender.send("globalError", { message: error.message })
    }
  }
}
