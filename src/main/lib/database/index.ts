import { app } from "electron"
import path from "path"
import { DataSource } from "typeorm"
import * as entities from "../../Entities"
const userDataPath = app.getPath("userData")
const databasePath = path.join(userDataPath, "doc_app-0-3.sqlite")

const appDataSource = new DataSource({
  type: "sqlite",
  database: databasePath,
  entities: [
    entities.Classificador,
    entities.ClassificadorContents,
    entities.Boletim,
    entities.BoletimContents,
    entities.Configuracoes,
    entities.Favoritos
  ]
})

appDataSource.initialize().then(dataSource => {
  console.log("Data Source has been initialized!")
  return dataSource
})

export default appDataSource

// export class Database {
//   private connection!: DataSource
//   private dbPath: string

//   constructor() {
//     const p = app.getPath("userData")
//     this.dbPath = path.join(p, "doc_app-0-3.sqlite")
//   }

//   public async init(): Promise<DataSource | null> {
//     try {
//       const dataSource = new DataSource({
//         type: "sqlite",
//         database: this.dbPath,
//         entities: [
//           entities.Classificador,
//           entities.ClassificadorContents,
//           entities.Boletim,
//           entities.BoletimContents,
//           entities.Configuracoes,
//           entities.Favoritos
//         ]
//       })

//       this.connection = await dataSource.initialize()
//       this.connection.synchronize()
//       return this.connection
//     } catch (error) {
//       console.log(error)
//       return null
//     }
//   }
// }
