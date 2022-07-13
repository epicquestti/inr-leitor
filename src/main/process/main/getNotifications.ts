import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Configuracoes } from "../../Entities"
export default {
  name: "getNotifications",
  handle: async (db: DataSource, event?: IpcMainEvent): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const configQueryBuilder = await db
        .getRepository(Configuracoes)
        .createQueryBuilder("configuracoes")
      const configResult = await configQueryBuilder
        .where("configuracoes.id = :id", {
          id: 1
        })
        .select([
          "configuracoes.notifyClassificador",
          "configuracoes.notifyBoletim"
        ])
        .getOne()

      event.sender.send("reloadNotifies", {
        success: true,
        contents: configResult
      })
    } catch (error: any) {
      event?.sender.send("reloadNotifies", {
        success: false,
        msg: error
      })
    }
  }
}
