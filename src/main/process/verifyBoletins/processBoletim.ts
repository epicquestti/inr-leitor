import { DataSource } from "typeorm"
import app from "../../config/app"
import {
  Boletim,
  BoletimContents,
  Configuracoes,
  Notificacoes
} from "../../Entities"
import { GET } from "../../lib"
const processBoletim = async (
  db: DataSource,
  appConfig: Configuracoes,
  lastPublishes: any
): Promise<{ success: boolean; notify: boolean }> => {
  try {
    if (appConfig) {
      const configQueryBuilder = await db
        .getRepository(Configuracoes)
        .createQueryBuilder("config")

      const notificacoesQueryBuilder = await db
        .getRepository(Notificacoes)
        .createQueryBuilder("notificacoes")

      let notifyBe = false

      if (appConfig.lastBeId < lastPublishes.lastBeId) {
        const nextBEList = await GET(
          `${app.api.inr.boletimAfter}/${appConfig.lastBeId}`
        )

        if (nextBEList.length > 0) {
          const beRepository = await db.getRepository(Boletim)
          const newNormalBeQueryBuilder = await beRepository.createQueryBuilder(
            "be"
          )
          const beContentsRepository = await db.getRepository(BoletimContents)
          const beContentsQueryBuilder =
            await beContentsRepository.createQueryBuilder("beContents")

          for (let i = 0; i < nextBEList.length; i++) {
            const BE = await GET(`${app.api.inr.boletim}/${nextBEList[i].id}`)

            const newNormalBe = await newNormalBeQueryBuilder
              .insert()
              .values([
                {
                  title: BE.titulo,
                  criadoEm: BE.criadoEm,
                  publicadoEm: BE.publicadoEm,
                  read: "N"
                }
              ])
              .execute()

            for (let y = 0; y < BE.contents.length; y++) {
              await beContentsQueryBuilder
                .insert()
                .values([
                  {
                    text: BE.contents[y].text,
                    url: BE.contents[y].url,
                    tipo: BE.contents[y].tipo,
                    boletim: newNormalBe.identifiers[0].id
                  }
                ])
                .execute()
            }

            await notificacoesQueryBuilder
              .insert()
              .values([
                {
                  createdAt: new Date(),
                  readed: false,
                  relatedDocumentId: newNormalBe.identifiers[0].id,
                  text: BE.titulo,
                  type: "B"
                }
              ])
              .execute()
          }

          notifyBe = true

          await configQueryBuilder
            .update()
            .set({
              lastBeId: lastPublishes.lastBeId
            })
            .where("id = :id", { id: 1 })
            .execute()
        }
      }

      const { notifyBoletim } = appConfig

      if (notifyBe && notifyBoletim) {
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

export default processBoletim
