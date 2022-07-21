import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Notificacoes } from "../../Entities"

export default {
  name: "allNotificationReaded",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const notificacoesQueryBuilder = await db
        .getRepository(Notificacoes)
        .createQueryBuilder("notificacoes")

      await notificacoesQueryBuilder.update().set({ readed: true }).execute()

      const notificationGrid = await notificacoesQueryBuilder
        .orderBy("notificacoes.createdAt", "DESC")
        .getMany()

      const responseArray: {
        id: number
        text: string
        read: string
        createdAt: string
      }[] = []

      for (let i = 0; i < notificationGrid.length; i++) {
        responseArray.push({
          id: notificationGrid[i].id,
          text: notificationGrid[i].text,
          read: notificationGrid[i].readed ? "S" : "N",
          createdAt: notificationGrid[i].createdAt.toLocaleDateString()
        })
      }

      const notificationList = await notificacoesQueryBuilder
        .orderBy("notificacoes.createdAt", "DESC")
        .take(10)
        .getMany()

      const notificationCount = await notificacoesQueryBuilder
        .where("notificacoes.readed = :readed", {
          readed: false
        })
        .getCount()

      event.sender.send("reloadNotificationList", {
        success: true,
        data: {
          notificationList,
          notificationCount: notificationCount
        }
      })

      event.sender.send("reloadNotificationGrid", {
        success: true,
        data: {
          notificationList: responseArray
        }
      })

      return
    } catch (error: any) {
      event?.sender.send("reloadNotificationGrid", {
        success: false,
        msg: error
      })
    }
  }
}
