import { IpcMainEvent } from "electron"
import { DataSource, Like } from "typeorm"
import { Boletim } from "../../Entities"

export default {
  name: "getBoletimList",
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

      const boletimRepository = await db.getRepository(Boletim)

      const count = await boletimRepository.count({
        where: {
          title: Like(`%${searchText}%`)
        }
      })

      const response = await boletimRepository.find({
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
      event.sender.send("realodBoletimList", { count, data: filterResults })
    } catch (error: any) {
      event?.sender.send("realodBoletimList", false)
    }
  }
}
