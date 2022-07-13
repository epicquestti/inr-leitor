import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Boletim, BoletimContents, Notificacoes } from "../../Entities"

type Data = {
  id: number
}

export default {
  name: "getThisBoletimById",
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: Data
  ): Promise<void> => {
    try {
      if (!event) throw new Error("Connection is needed.")

      const beRepository = await db.getRepository(Boletim)
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

      const beContentsRepository = await db.getRepository(BoletimContents)
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

      const notificacoesRepository = await db.getRepository(Notificacoes)
      const notificacaoToUpdate = await notificacoesRepository.findOne({
        where: {
          relatedDocumentId: be.id,
          type: "B",
          readed: false
        }
      })

      if (notificacaoToUpdate) {
        notificacaoToUpdate.readed = true
        await notificacoesRepository.save(notificacaoToUpdate)
      }

      event.sender.send("realodBoletim", boletin)
      event.sender.send("getNotificationList")
    } catch (error: any) {
      event?.sender.send("realodBoletim", false)
    }
  }
}
