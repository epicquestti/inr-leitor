import { DataSource } from "typeorm"
import * as entities from "../../Entities"

const initDatabase = async (path: string) => {
  try {
    const appDataSource = new DataSource({
      type: "sqlite",
      database: path,
      entities: [
        entities.Classificador,
        entities.ClassificadorContents,
        entities.Boletim,
        entities.BoletimContents,
        entities.Configuracoes,
        entities.Favoritos,
        entities.Notificacoes
      ]
    })

    const dts = await appDataSource.initialize()
    await dts.synchronize(false)
    return dts
  } catch (error) {
    console.log(error)
  }
}

export default initDatabase
