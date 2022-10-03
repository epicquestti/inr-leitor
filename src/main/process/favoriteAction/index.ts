import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Boletim, Classificador, Favoritos } from "../../Entities"

export type favoriteListResponse = {
  id?: number
  idFavorito: number
  titulo: string
  data?: string
  type?: string
}

export default {
  name: "favoriteAction",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("Event is needed.")

      const { id, type, action } = data

      if (!id) throw new Error("identificador Ausente.")
      if (!type) throw new Error("tipo Ausente.")
      if (!action) throw new Error("Ação Ausente.")

      const allFavListRepository = await db.getRepository(Favoritos)
      const classificadorRepository = await db.getRepository(Classificador)
      const boletimRepository = await db.getRepository(Boletim)
      const favorite = await allFavListRepository.findOne({
        where: {
          id: parseInt(id)
        }
      })

      if (!favorite) throw new Error("Favorito não encontrado.")

      switch (action) {
        case "select":
          if (type === "C") {
            return event.sender.send("resolveAction", {
              action: "goTo",
              url: `/classificador/${favorite.idFavorito}`
            })
          }
          if (type === "B") {
            return event.sender.send("resolveAction", {
              action: "goTo",
              url: `/boletim/${favorite.idFavorito}`
            })
          }
          break
        case "delete":
          await allFavListRepository.delete({
            id: parseInt(id)
          })
          if (type === "C") {
            return event.sender.send("resolveAction", {
              action: "msg",
              message: "Classificador removido dos favoritos."
            })
          }
          if (type === "B") {
            return event.sender.send("resolveAction", {
              action: "msg",
              message: "Boletim removido dos favoritos."
            })
          }
          break
      }
    } catch (error: any) {
      event?.sender.send("resolveAction", false)
    }
  }
}
