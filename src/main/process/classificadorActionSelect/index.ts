import { IpcMainEvent } from "electron"
import { DataSource, Like } from "typeorm"
import { Classificador } from "../../Entities"

export default {
  name: "classificadorActionSelect",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")
      if (!data) throw new Error("data is needed.")

      const classificadorRepository = await db.getRepository(Classificador)
      const classificadorSelected = await classificadorRepository.findOne({
        where: {
          id: data.id
        }
      })

      if (data.actionName === "lookThis") {
        return event.sender.send("classificadorSendToTarget", {
          success: true,
          data: classificadorSelected.id
        })
      }

      if (data.actionName === "readThis") classificadorSelected.read = "S"
      if (data.actionName === "unreadThis") classificadorSelected.read = "N"

      await classificadorRepository.save(classificadorSelected)

      const count = await classificadorRepository.count({
        where: {
          title: Like(`%${data.text}%`)
        }
      })

      const response = await classificadorRepository.find({
        where: {
          title: Like(`%${data.text}%`)
        },
        order: {
          publicadoEm: "DESC"
        },
        take: data.limit,
        skip: data.page * data.limit
      })

      const filterResults = response.map(item => {
        return {
          id: item.id,
          title: item.title,
          criadoEm: item.criadoEm.toLocaleDateString(),
          publicadoEm: item.publicadoEm.toLocaleDateString(),
          read: item.read === "S" ? "Lido" : "Ñ. Lido",
          icon: item.read === "S" ? "beenhere" : "bookmark_border",
          iconColor: item.read === "S" ? "#81C784" : "#FFE082"
        }
      })

      return event.sender.send("realodClassificadoresList", {
        count,
        data: filterResults
      })
    } catch (error: any) {
      event?.sender.send("realodBoletimList", {
        success: false,
        msg: error
      })
    }
  }
}
