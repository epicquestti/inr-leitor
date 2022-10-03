import { IpcMainEvent } from "electron"
import { DataSource, In } from "typeorm"
import { Favoritos } from "../../Entities"

type Data = {
  id: number
  type: string
}

export type favoriteListResponse = {
  id?: number
  idFavorito: number
  titulo: string
  data?: string
  type?: string
}

export default {
  name: "removeListFavorite",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("Connection is needed.")

      if (!data) throw new Error("Voce não selecionou nenhum item.")
      if (data.length <= 0) throw new Error("Voce não selecionou nenhum item.")

      const favoriteRepository = await db.getRepository(Favoritos)
      await favoriteRepository.delete({ id: In(data) })

      return event.sender.send("resolveAction", {
        action: "msg",
        message: "Favoritos selecionados excluidos com sucesso."
      })
    } catch (error: any) {
      return event?.sender.send("resolveAction", {
        action: "msg",
        message: error.message
      })
    }
  }
}
