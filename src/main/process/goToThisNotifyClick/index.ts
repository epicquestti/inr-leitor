import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Notificacoes } from "../../Entities"

export default {
  name: "goToThisNotifyClick",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")
      if (!data) throw new Error("data is needed.")
      if (!data.id) throw new Error("iid is needed.")

      const beRepository = await db.getRepository(Notificacoes)
      const nt = await beRepository.findOne({
        where: {
          id: data?.id
        }
      })

      if (!nt) throw new Error("Não encontrado")

      let goTo = ""

      if (nt.type === "A") {
        goTo = nt.link
      }

      if (nt.type === "B") {
        goTo = `/boletim/${nt.id}`
      }

      if (nt.type === "C") {
        goTo = `/classificador/${nt.id}`
      }

      if (nt.type === "U") {
        goTo = nt.link
      }

      return event.sender.send("goToNotificationAction", {
        success: true,
        data: {
          goTo,
          notificacao: nt,
          type: nt.type
        }
      })
    } catch (error: any) {
      console.log(error)

      event?.sender.send("goToNotificationAction", {
        success: false,
        msg: error
      })
    }
  }
}
