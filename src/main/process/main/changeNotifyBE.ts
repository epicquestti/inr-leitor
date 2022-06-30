import { IpcMainEvent } from "electron"
import { Configuracoes } from "../../Entities"
import { database } from "../../lib"

export default {
  name: "changeNotifyBE",
  handle: async (data: boolean, event?: IpcMainEvent): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const configRepository = await database.getRepository(Configuracoes)

      await configRepository.save({
        id: 1,
        notifyBoletim: data
      })

      // const updateBE: string = `UPDATE Configuracoes SET notifyBoletim=${data} WHERE id=1;`

      // await connection.query(updateBE)

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
