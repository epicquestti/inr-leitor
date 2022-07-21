import { IpcMainEvent } from "electron"
import { DataSource, ILike } from "typeorm"
import { Boletim, Classificador, Favoritos } from "../../Entities"

export type favoriteListResponse = {
  id?: number
  idFavorito: number
  titulo: string
  data?: string
  type?: string
}

export default {
  name: "getFavoriteList",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("Event is needed.")

      const res: favoriteListResponse[] = []

      const allFavListRepository = await db.getRepository(Favoritos)
      const allFavListResponse = await allFavListRepository.find({
        order: {
          idFavorito: "DESC"
        }
      })

      if (allFavListResponse.length > 0) {
        const classificadorRepository = await db.getRepository(Classificador)
        const boletimRepository = await db.getRepository(Boletim)

        const be: number[] = []
        const cl: number[] = []

        for (let i = 0; i < allFavListResponse.length; i++) {
          if (allFavListResponse[i].tipoFavorito === "B") {
            be.push(allFavListResponse[i].idFavorito)
          }
          if (allFavListResponse[i].tipoFavorito === "C") {
            cl.push(allFavListResponse[i].idFavorito)
          }
        }

        const boletins = await boletimRepository.find({
          where: [
            { title: ILike(`%${data.searchText}%`) },
            { publicadoEm: new Date(data.searchText) }
          ]
        })

        const classificadores = await classificadorRepository.find({
          where: [
            { title: ILike(`%${data.searchText}%`) },
            { publicadoEm: new Date(data.searchText) }
          ]
        })

        for (let i = 0; i < boletins.length; i++) {
          const hasBe = be.findIndex(item => item === boletins[i].id)

          if (hasBe > -1) {
            res.push({
              id: boletins[i].id,
              titulo: boletins[i].title,
              idFavorito: boletins[i].id,
              data: boletins[i].publicadoEm.toString(),
              type: "B"
            })
          }
        }

        for (let ii = 0; ii < classificadores.length; ii++) {
          const hasCl = cl.findIndex(item => item === classificadores[ii].id)
          if (hasCl > -1) {
            res.push({
              id: classificadores[ii].id,
              titulo: classificadores[ii].title,
              idFavorito: classificadores[ii].id,
              data: classificadores[ii].publicadoEm.toString(),
              type: "C"
            })
          }
        }

        return event.sender.send("reloadFavoritos", res)
      } else {
        return event.sender.send("reloadFavoritos", [])
      }
    } catch (error: any) {
      event?.sender.send("reloadFavoritos", false)
    }
  }
}
