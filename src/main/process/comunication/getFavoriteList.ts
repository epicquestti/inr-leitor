import { IpcMainEvent } from "electron"
import { ILike } from "typeorm"
import { Boletim, Classificador, Favoritos } from "../../Entities"
import { database } from "../../lib"

export type favoriteListResponse = {
  id?: number
  idFavorito: number
  titulo: string
  data?: string
  type?: string
}

type Data = {
  type: "B" | "C"
  searchText: string
}

export default {
  name: "getFavoriteList",
  handle: async (data: Data, event?: IpcMainEvent): Promise<void> => {
    try {
      if (!event) throw new Error("Event is needed.")

      const res: favoriteListResponse[] = []

      const allFavListRepository = await database.getRepository(Favoritos)
      const allFavListResponse = await allFavListRepository.find({
        order: {
          idFavorito: "DESC"
        }
      })

      if (allFavListResponse.length > 0) {
        const classificadorRepository = await database.getRepository(
          Classificador
        )
        const boletimRepository = await database.getRepository(Boletim)

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
      console.log(error)

      event?.sender.send("reloadFavoritos", false)
    }
  }
}