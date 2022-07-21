import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Boletim, Classificador } from "../../Entities"

export default {
  name: "initiCarrourcel",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const clRepositorio = await db.getRepository(Classificador)
      const BeRepositorio = await db.getRepository(Boletim)

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
