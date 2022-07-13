import { DataSource } from "typeorm"
import appConfigs from "../../../config/app"
import { Configuracoes } from "../../../Entities"
import { GET, stringGenerator } from "../../../lib"

export default async function configurationProcess(
  db: DataSource
): Promise<void> {
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

    if (!configResult) {
      const instaName = await stringGenerator("inrAppID:")
      const lastPublications = await GET(appConfigs.api.inr.lastPublishes)
      const newConfig = {
        id: 1,
        instanceName: instaName,
        lastBeId: lastPublications.lastBeId,
        lastClassId: lastPublications.lastClassId,
        notifyClassificador: true,
        notifyBoletim: true
      }
      await configQueryBuilder.insert().values([newConfig]).execute()
    }
  } catch (error) {
    console.log(error)
  }
}
