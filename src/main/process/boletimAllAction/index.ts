import { IpcMainEvent } from "electron"
import { DataSource, Like } from "typeorm"
import { Boletim } from "../../Entities"

export default {
  name: "boletimAllAction",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")
      if (!data) throw new Error("data is needed.")

      const boletimRepository = await db.getRepository(Boletim)
      const boletimQueryBuilder = await boletimRepository.createQueryBuilder(
        "boletins"
      )

      await boletimQueryBuilder.update().set({ read: data.readState }).execute()
      const count = await boletimRepository.count({
        where: {
          title: Like(`%${data.text}%`)
        }
      })
      const response = await boletimRepository.find({
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

      return event.sender.send("realodBoletimList", {
        count,
        data: filterResults
      })
    } catch (error: any) {
      event?.sender.send("reloadNotificationGrid", {
        success: false,
        msg: error
      })
    }
  }
}
