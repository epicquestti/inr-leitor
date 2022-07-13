import { DataSource } from "typeorm"
import { Configuracoes } from "../../../Entities"

export default async function getConfigurations(
  db: DataSource
): Promise<Configuracoes | null> {
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
  } catch (error) {
    console.log(error)
    return null
  }
}
