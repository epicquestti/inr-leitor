import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Notificacoes } from "../../../Entities"

export default {
  name: "getNotificationList",
  handle: async (db: DataSource, event?: IpcMainEvent): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

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

      return event.sender.send("reloadNotificationList", {
        success: true,
        data: {
          notificationList,
          notificationCount: notificationCount
        }
      })
    } catch (error: any) {
      console.log(error)

      event?.sender.send("reloadNotificationList", {
        success: false,
        msg: error
      })
    }
  }
}
