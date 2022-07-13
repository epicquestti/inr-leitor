import { DataSource } from "typeorm"
import app from "../../../config/app"
import {
  Classificador,
  ClassificadorContents,
  Configuracoes,
  Notificacoes
} from "../../../Entities"
import { GET } from "../../../lib"
const processClassificadores = async (
  db: DataSource,
  appConfig: Configuracoes,
  lastPublishes: any
): Promise<{ success: boolean; notify: boolean }> => {
  try {
    if (appConfig) {
      const configQueryBuilder = await db
        .getRepository(Configuracoes)
        .createQueryBuilder()
      const notificacoesQueryBuilder = await db
        .getRepository(Notificacoes)
        .createQueryBuilder()
      let notifyClass = false

      if (appConfig.lastClassId < lastPublishes.lastClassId) {
        const nextCLList = await GET(
          `${app.api.inr.classificadorAfter}/${appConfig.lastClassId}`
        )

        if (nextCLList.length > 0) {
          const clQueryBuilder = await db
            .getRepository(Classificador)
            .createQueryBuilder("cl")
          const clContentsQueryBuilder = await db
            .getRepository(ClassificadorContents)
            .createQueryBuilder("clContents")

          for (let c = 0; c < nextCLList.length; c++) {
            const CL = await GET(
              `${app.api.inr.classificador}/${nextCLList[c].id}`
            )

            const newNormalClass = await clQueryBuilder
              .insert()
              .values([
                {
                  title: CL.titulo,
                  criadoEm: CL.criadoEm,
                  publicadoEm: CL.publicadoEm,
                  read: "N"
                }
              ])
              .execute()

            await notificacoesQueryBuilder
              .insert()
              .values([
                {
                  createdAt: new Date(),
                  readed: false,
                  relatedDocumentId: newNormalClass.identifiers[0].id,
                  text: CL.titulo,
                  type: "C"
                }
              ])
              .execute()

            for (let d = 0; d < CL.contents.length; d++) {
              await clContentsQueryBuilder
                .insert()
                .values([
                  {
                    classificador: newNormalClass.identifiers[0].id,
                    tipo: CL.contents[d].tipo,
                    url: CL.contents[d].url
                  }
                ])
                .execute()
            }
          }

          notifyClass = true

          await configQueryBuilder
            .update()
            .set({
              lastClassId: lastPublishes.lastClassId
            })
            .where("id = :id", { id: 1 })
            .execute()
        }
      }

      const { notifyClassificador } = appConfig

      if (notifyClass && notifyClassificador) {
        return {
          success: true,
          notify: true
        }
      } else {
        return {
          success: true,
          notify: false
        }
      }
    } else {
      return {
        success: false,
        notify: false
      }
    }
  } catch (error: any) {
    return {
      success: false,
      notify: false
    }
  }
}

export default processClassificadores
