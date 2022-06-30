import { Notification } from "electron"
import app from "../../config/app"
import {
  Boletim,
  BoletimContents,
  Classificador,
  ClassificadorContents,
  Configuracoes
} from "../../Entities"
import { database, GET } from "../../lib"
import getApplicationConfig from "./getApplicationConfig"

const verifyBoletins = async (iconPath: string) => {
  try {
    const appConfig = await getApplicationConfig()

    if (appConfig) {
      const configRepository = await database.getRepository(Configuracoes)
      const lastPublishes = await GET(app.api.inr.lastPublishes)
      let notifyBe = false
      let notifyClass = false

      if (appConfig.lastBeId < lastPublishes.lastBeId) {
        const nextBEList = await GET(
          `${app.api.inr.boletimAfter}/${appConfig.lastBeId}`
        )

        if (nextBEList.length > 0) {
          const beRepository = await database.getRepository(Boletim)
          const beContentsRepository = await database.getRepository(
            BoletimContents
          )
          for (let i = 0; i < nextBEList.length; i++) {
            const BE = await GET(`${app.api.inr.boletim}/${nextBEList[i].id}`)
            const newNormalBe = await beRepository.save({
              title: BE.titulo,
              criadoEm: BE.criadoEm,
              publicadoEm: BE.publicadoEm,
              read: "N"
            })
            for (let y = 0; y < BE.contents.length; y++) {
              await beContentsRepository.save({
                text: BE.contents[y].text,
                url: BE.contents[y].url,
                tipo: BE.contents[y].tipo,
                boletim: newNormalBe
              })
            }
          }

          notifyBe = true

          await configRepository.save({
            id: 1,
            lastBeId: lastPublishes.lastBeId
          })
        }
      }

      if (appConfig.lastClassId < lastPublishes.lastClassId) {
        const nextCLList = await GET(
          `${app.api.inr.classificadorAfter}/${appConfig.lastClassId}`
        )

        if (nextCLList.length > 0) {
          const clRepository = await database.getRepository(Classificador)
          const clContentsRepository = await database.getRepository(
            ClassificadorContents
          )
          for (let c = 0; c < nextCLList.length; c++) {
            const CL = await GET(
              `${app.api.inr.classificador}/${nextCLList[c].id}`
            )

            const newNormalClass = await clRepository.save({
              title: CL.titulo,
              criadoEm: CL.criadoEm,
              publicadoEm: CL.publicadoEm,
              read: "N"
            })

            for (let d = 0; d < CL.contents.length; d++) {
              await clContentsRepository.save({
                classificador: newNormalClass,
                tipo: CL.contents[d].tipo,
                url: CL.contents[d].url
              })
            }
          }

          notifyClass = true

          await configRepository.save({
            id: 1,
            lastClassId: lastPublishes.lastClassId
          })
        }
      }

      const { notifyClassificador, notifyBoletim } = appConfig

      if ((notifyClassificador || notifyBoletim) && notifyBe && notifyClass) {
        new Notification({
          title: "Novo conteúdo disponível.",
          body: "novos conteúdos estão a disposição para leitura.",
          icon: iconPath
        }).show()
      }

      if (notifyBe && notifyBoletim)
        new Notification({
          title: "Novo boletim eletrônico disponível.",
          body: "Seu boletim eletrônico INR já está disponível para leitura.",
          icon: iconPath
        }).show()

      if (notifyClass && notifyClassificador)
        new Notification({
          title: "Novo Classificador disponível.",
          body: "Seu Classificador já está disponível para leitura.",
          icon: iconPath,
          subtitle: "INR Publicações"
        }).show()
    }
  } catch (error) {
    console.log(error)
  }
}

export default verifyBoletins
