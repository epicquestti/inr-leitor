import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Configuracoes } from "../../Entities"
export default {
  name: "changeNotifyCL",
  handle: async (
    db: DataSource,
    data: boolean,
    event?: IpcMainEvent
  ): Promise<void> => {
    try {
      if (!event) throw new Error("event is needed.")

      const configRepository = await db.getRepository(Configuracoes)

      await configRepository.save({
        id: 1,
        notifyClassificador: data
      })

      // const updateCL: string = `UPDATE Configuracoes SET notifyClassificador=${data} WHERE id=1;`

      // await connection.query(updateCL)

      event.sender.send("responseNotifyCL", {
        success: true,
        msg: "Notificações de novos Classificadores alteradas com sucesso"
      })
    } catch (error: any) {
      event?.sender.send("responseNotifyCL", {
        success: false,
        msg: error
      })
    }
  }
}
