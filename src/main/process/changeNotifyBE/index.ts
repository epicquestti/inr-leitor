import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Configuracoes } from "../../Entities"

export default {
  name: "changeNotifyBE",
  processListener: true,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const configRepository = await db.getRepository(Configuracoes)
      await configRepository.save({
        id: 1,
        notifyBoletim: data
      })
      event.sender.send("responseNotifyBE", {
        success: true,
        msg: "Notificações de novos boletins alteradas com sucesso"
      })
    } catch (error: any) {
      event?.sender.send("responseNotifyBE", {
        success: false,
        msg: error
      })
    }
  }
}
