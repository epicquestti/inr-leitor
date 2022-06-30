import app from "../../../config/app"
import { Configuracoes } from "../../../Entities"
import { database, GET, stringGenerator } from "../../../lib"

export default async function fisrtConfiguration(): Promise<
  Configuracoes | undefined
> {
  try {
    const repository = await database.getRepository(Configuracoes)
    const config = await repository.findOne({
      where: {
        id: 1
      }
    })

    if (config) {
      return config
    } else {
      const lastPublishes = await GET(app.api.inr.lastPublishes)
      const { lastBeId, lastClassId } = lastPublishes
      const instaName: string = await stringGenerator("inrApp-")
      const createdConfig = await repository.create({
        id: 1,
        instanceName: instaName,
        lastBeId: lastBeId,
        lastClassId: lastClassId,
        notifyClassificador: true,
        notifyBoletim: true
      })

      return createdConfig
    }
  } catch (error) {
    console.log(error)
    return undefined
  }
}
