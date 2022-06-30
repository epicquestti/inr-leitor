import { IpcMainEvent } from "electron"
import { Favoritos } from "../../Entities"
import { database } from "../../lib"

type Data = {
  id: number
}

export default {
  name: "favoriteThisBE",
  handle: async (event?: IpcMainEvent, data?: Data): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const favoritoRepositoy = await database.getRepository(Favoritos)
      const hasFavorite = await favoritoRepositoy.findOne({
        where: {
          idFavorito: data?.id,
          tipoFavorito: "C"
        }
      })

      if (hasFavorite) {
        return event.sender.send("favoriteThisClassificadorResponse", {
          success: false,
          msg: "Boletim ja esta presente em seus favoritos."
        })
      }

      const res = await favoritoRepositoy.save({
        tipoFavorito: "B",
        idFavorito: data?.id
      })

      if (res)
        return event.sender.send("favoriteThisBEResponse", {
          success: true,
          msg: "Boletim inserido em seus favoritos com sucesso."
        })
    } catch (error: any) {
      event?.sender.send("favoriteThisBEResponse", {
        success: false,
        msg: error
      })
    }
  }
}
