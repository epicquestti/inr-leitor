import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Notificacoes } from "../../Entities"

export default {
  name: "notificationAllAction",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")
      if (!data) throw new Error("data is needed.")

      const notificacoesQueryBuilder = await db
        .getRepository(Notificacoes)
        .createQueryBuilder("notificacoes")

      await notificacoesQueryBuilder
        .update()
        .set({ readed: data.readState })
        .execute()

      const notificationGrid = await notificacoesQueryBuilder
        .orderBy("notificacoes.createdAt", "DESC")
        .getMany()

      const responseArray: {
        id: number
        text: string
        read: string
        icon: string
        iconColor: string
        createdAt: string
      }[] = []

      for (let i = 0; i < notificationGrid.length; i++) {
        responseArray.push({
          id: notificationGrid[i].id,
          text: notificationGrid[i].text,
          read: notificationGrid[i].readed ? "Lido" : "Ñ. Lido",
          icon: notificationGrid[i].readed ? "beenhere" : "bookmark_border",
          iconColor: notificationGrid[i].readed ? "#81C784" : "#FFE082",
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
