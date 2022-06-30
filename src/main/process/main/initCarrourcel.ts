import { IpcMainEvent } from "electron"
import { Boletim, Classificador } from "../../Entities"
import { database } from "../../lib"

export default {
  name: "initiCarrourcel",
  handle: async (event?: IpcMainEvent): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const clRepositorio = await database.getRepository(Classificador)
      const BeRepositorio = await database.getRepository(Boletim)

      const be = await BeRepositorio.find({
        select: {
          title: true
        },
        order: {
          publicadoEm: {
            direction: "DESC"
          }
        },
        take: 2
      })
      const classificador = await clRepositorio.find({
        select: {
          title: true
        },
        order: {
          publicadoEm: {
            direction: "DESC"
          }
        },
        take: 2
      })

      event.sender.send("refreshCarroucel", {
        classificador: classificador,
        boletin: be
      })
    } catch (error: any) {
      event?.sender.send("refreshCarroucel", {
        success: false,
        msg: error
      })
    }
  }
}
