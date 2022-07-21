import { IpcMainEvent, shell } from "electron"
import { DataSource } from "typeorm"
import { Notificacoes } from "../../Entities"
export type notifications = {
  id: number
  createdAt: Date
  text: string
  type: string
  readed: boolean
  relatedDocumentId?: number
  link?: string
}
export default {
  name: "updatesOpenInBrowser",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      const notificationQueryBuilder = await db
        .getRepository(Notificacoes)
        .createQueryBuilder("notificacoes")

      await notificationQueryBuilder
        .update()
        .set({
          readed: true
        })
        .where("id = :id", { id: data.id })
        .execute()

      event.sender.send("getNotificationList")
      await shell.openExternal(data.link)
    } catch (error: any) {
      console.log("error.message")
    }
  }
}
