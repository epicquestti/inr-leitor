import { IpcMainEvent } from "electron"
import { Boletim, BoletimContents } from "../../Entities"
import { database } from "../../lib"

type Data = {
  id: number
}

export default {
  name: "getThisBoletimById",
  handle: async (event?: IpcMainEvent, data?: Data): Promise<void> => {
    try {
      if (!event) throw new Error("Connection is needed.")

      const beRepository = await database.getRepository(Boletim)
      const be = await beRepository.findOne({
        where: {
          id: data?.id
        },
        select: {
          id: true,
          title: true,
          criadoEm: true,
          publicadoEm: true,
          read: true
        }
      })

      const beContentsRepository = await database.getRepository(BoletimContents)
      const beContents = await beContentsRepository.find({
        where: {
          boletim: {
            id: data?.id
          }
        },
        select: {
          id: true,
          text: true,
          url: true,
          tipo: true
        }
      })

      if (!be) throw new Error("No Be finded.")

      const boletin = {
        id: be.id,
        title: be.title,
        criadoEm: be.criadoEm,
        publicadoEm: be.publicadoEm,
        read: be.read,
        contents: beContents.map(item => ({
          id: item.id,
          text: item.text,
          tipo: item.tipo,
          url: item.url
        }))
      }

      be.read = "S"

      await beRepository.save(be)

      event.sender.send("realodBoletim", boletin)
    } catch (error: any) {
      event?.sender.send("realodBoletim", false)
    }
  }
}
