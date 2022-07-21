import { IpcMainEvent } from "electron"
import { DataSource } from "typeorm"
import { Configuracoes } from "../../Entities"

export default {
  name: "getConfigurations",
  processListener: false,
  handle: async (
    db: DataSource,
    event?: IpcMainEvent,
    data?: any
  ): Promise<Configuracoes | null> => {
    try {
      const consfigRepository = await db.getRepository(Configuracoes)
      const configQueryBuilder = await consfigRepository.createQueryBuilder(
        "configuracoes"
      )
      const configResult = await configQueryBuilder
        .where("configuracoes.id = :id", {
          id: 1
        })
        .getOne()

      return configResult ? configResult : null
    } catch (error: any) {
      console.log(error.message)
      return null
    }
  }
}
