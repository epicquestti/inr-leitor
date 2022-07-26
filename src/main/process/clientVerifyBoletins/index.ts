import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import verifyBoletins from "../verifyBoletins"

export default {
  name: "clientVerifyBoletins",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      await verifyBoletins.handle(db, event, data)

      return event.sender.send("clientVerifyBoletinsResponse", {
        message: "Verificação concluida."
      })
    } catch (error: any) {
      return event.sender.send("clientVerifyBoletinsResponse", {
        message: error.message
      })
    }
  }
}
