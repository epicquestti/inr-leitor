import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"

export default {
  name: "checkDbStatus",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      event.sender.send("checkDbStatusResponse", {
        dbConnected: db?.isInitialized
      })
    } catch (error: any) {
      event?.sender.send("globalError", { message: error.message })
    }
  }
}
