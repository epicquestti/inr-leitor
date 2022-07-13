import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Favoritos } from "../../Entities"

type Data = {
  id: number
}

export default {
  name: "favoriteThisClassificador",
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: Data
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const favoritoRepositoy = await db.getRepository(Favoritos)
      const hasFavorite = await favoritoRepositoy.findOne({
        where: {
          idFavorito: data?.id,
          tipoFavorito: "C"
        }
      })

      if (hasFavorite) {
        return event.sender.send("favoriteThisClassificadorResponse", {
          success: false,
          msg: "Classificador ja esta presente em seus favoritos."
        })
      }

      const res = await favoritoRepositoy.save({
        tipoFavorito: "C",
        idFavorito: data?.id
      })

      if (res)
        event.sender.send("favoriteThisClassificadorResponse", {
          success: true,
          msg: "Classificador inserido em seus favoritos com sucesso."
        })
    } catch (error: any) {
      event?.sender.send("favoriteThisClassificadorResponse", {
        success: false,
        msg: error
      })
    }
  }
}
