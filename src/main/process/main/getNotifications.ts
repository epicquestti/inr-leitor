import { IpcMainEvent } from "electron"
import { Configuracoes } from "../../Entities"
import { database } from "../../lib"
export default {
  name: "getNotifications",
  handle: async (event?: IpcMainEvent): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const configRepository = await database.getRepository(Configuracoes)
      const response = await configRepository.findOne({
        where: {
          id: 1
        },
        select: ["notifyClassificador", "notifyBoletim"]
      })
      event.sender.send("reloadNotifies", {
        success: true,
        contents: response
      })
    } catch (error: any) {
      event?.sender.send("reloadNotifies", {
        success: false,
        msg: error
      })
    }
  }
}
