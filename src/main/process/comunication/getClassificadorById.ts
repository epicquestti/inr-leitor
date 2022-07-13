import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import {
  Classificador,
  ClassificadorContents,
  Notificacoes
} from "../../Entities"

type Data = {
  id: number
}

export default {
  name: "getClassificadorById",
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: Data
  ): Promise<void> => {
    try {
      if (!event) throw new Error("Connection is needed.")

      const clRepository = await db.getRepository(Classificador)
      const cl = await clRepository.findOne({
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

      const clContentsRepository = await db.getRepository(ClassificadorContents)

      const clContents = await clContentsRepository.find({
        where: {
          classificador: {
            id: data?.id
          }
        },
        select: {
          id: true,
          tipo: true,
          url: true
        }
      })

      if (!cl) throw new Error("No Classificado finded.")

      const classificador = {
        id: cl.id,
        title: cl.title,
        criadoEm: cl.criadoEm,
        publicadoEm: cl.publicadoEm,
        read: cl.read,
        contents: clContents.map(item => ({
          id: item.id,
          tipo: item.tipo,
          url: item.url
        }))
      }

      cl.read = "S"

      await clRepository.save(cl)

      const notificacoesRepository = await db.getRepository(Notificacoes)
      const notificacaoToUpdate = await notificacoesRepository.findOne({
        where: {
          relatedDocumentId: cl.id,
          type: "C"
        }
      })

      if (notificacaoToUpdate) {
        notificacaoToUpdate.readed = true
        await notificacoesRepository.save(notificacaoToUpdate)
      }

      event.sender.send("relaodClassificador", classificador)
    } catch (error: any) {
      event?.sender.send("relaodClassificador", false)
    }
  }
}
