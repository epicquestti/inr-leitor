import { IpcMainEvent } from "electron"
import { Like } from "typeorm"
import { Classificador } from "../../Entities"
import { database } from "../../lib"

type Data = {
  text?: string
  page?: number
  limit?: number
}

export default {
  name: "getClassificadoresList",
  handle: async (event?: IpcMainEvent, data?: Data): Promise<void> => {
    try {
      let searchText = ""
      let page = 0
      let limit = 10
      if (!event) throw new Error("Connection is needed.")
      if (data?.text) searchText = data.text

      if (data?.page) page = data?.page
      if (data?.limit) limit = data?.limit

      const classificadorRepository = await database.getRepository(
        Classificador
      )

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
          read: item.read
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
