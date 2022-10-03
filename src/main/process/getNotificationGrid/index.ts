import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Notificacoes } from "../../Entities"

export default {
  name: "getNotificationGrid",
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

      const notificationList = await notificacoesQueryBuilder
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

      for (let i = 0; i < notificationList.length; i++) {
        responseArray.push({
          id: notificationList[i].id,
          text: notificationList[i].text,
          read: notificationList[i].readed ? "Lido" : "Ñ. Lido",
          icon: notificationList[i].readed ? "beenhere" : "bookmark_border",
          iconColor: notificationList[i].readed ? "#81C784" : "#FFE082",
          createdAt: notificationList[i].createdAt.toLocaleDateString()
        })
      }

      return event.sender.send("reloadNotificationGrid", {
        success: true,
        data: {
          notificationList: responseArray
        }
      })
    } catch (error: any) {
      console.log(error)

      event?.sender.send("reloadNotificationGrid", {
        success: false,
        msg: error
      })
    }
  }
}
