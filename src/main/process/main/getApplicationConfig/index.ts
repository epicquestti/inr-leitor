import app from "../../../config/app"
import { Configuracoes } from "../../../Entities"
import { database, GET, stringGenerator } from "../../../lib"

export default async function getApplicationConfig(): Promise<
  Configuracoes | undefined
> {
  try {
    const configRepository = await database.getRepository(Configuracoes)
    const config = await configRepository.findOne({
      where: {
        id: 1
      }
    })

    if (config) return config
    else {
      const lastPublishes = await GET(app.api.inr.lastPublishes)

      const { lastBeId, lastClassId } = lastPublishes
      const InstaName: string = await stringGenerator("inrApp-")
      const createdConfig = await configRepository.save({
        id: 1,
        instanceName: InstaName,
        lastBeId: lastBeId,
        lastClassId: lastClassId,
        notifyBoletim: true,
        notifyClassificador: true
      })
      return createdConfig
    }
  } catch (error) {
    console.log("error", error)
    return undefined
  }
}
