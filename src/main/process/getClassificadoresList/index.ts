import { IpcMainEvent } from "electron"
import { DataSource, Like } from "typeorm"
import { Classificador } from "../../Entities"

export default {
  name: "getClassificadoresList",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      let searchText = ""
      let page = 0
      let limit = 10
      if (!event) throw new Error("Connection is needed.")
      if (data?.text) searchText = data.text

      if (data?.page) page = data?.page
      if (data?.limit) limit = data?.limit

      const classificadorRepository = await db.getRepository(Classificador)

      const count = await classificadorRepository.count({
        where: {
          title: Like(`%${searchText}%`)
        }
      })

      const response = await classificadorRepository.find({
        where: {
          title: Like(`%${searchText}%`)
        },
        order: {
          publicadoEm: "DESC"
        },
        take: limit,
        skip: page * limit
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

      event.sender.send("realodClassificadoresList", {
        count,
        data: filterResults
      })
    } catch (error: any) {
      event?.sender.send("realodClassificadoresList", false)
    }
  }
}
