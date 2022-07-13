import { DataSource } from "typeorm"
import { Notificacoes } from "../../../Entities"

const processNotificationsUpdates = async (
  db: DataSource,
  requestVersion: {
    version?: number
    major?: number
    minor?: number
  },
  versionProcessResult: {
    success: boolean
    needUpdate?: boolean
    mandatory?: boolean
    message?: string
    log?: boolean
  }
): Promise<void> => {
  const todayDate = new Date()
  todayDate.setDate(todayDate.getDate() - 1)

  const notificacoesQueryBuilder = await db
    .getRepository(Notificacoes)
    .createQueryBuilder("notificacoes")

  const version = `${requestVersion.version}.${requestVersion.major}.${requestVersion.minor}`

  if (versionProcessResult.needUpdate && versionProcessResult.mandatory) {
    const hasNotification = await notificacoesQueryBuilder.where(
      "notificacoes.type = :type AND notificacoes.version = :version AND notificacoes.createdAt >= :todayDate",
      {
        type: "U",
        version: version,
        todayDate: todayDate
      }
    )

    if (!hasNotification) {
      await notificacoesQueryBuilder.insert().values([
        {
          readed: false,
          createdAt: new Date(),
          text: versionProcessResult.message,
          type: "U",
          version: version
        }
      ])
    }
  }

  if (versionProcessResult.needUpdate && !versionProcessResult.mandatory) {
    const hasNotification = await notificacoesQueryBuilder.where(
      "notificacoes.type = :type AND notificacoes.version = :version AND notificacoes.createdAt >= :todayDate",
      {
        type: "A",
        version: version,
        todayDate: todayDate
      }
    )

    if (!hasNotification) {
      await notificacoesQueryBuilder.insert().values([
        {
          readed: false,
          createdAt: new Date(),
          text: versionProcessResult.message,
          type: "A",
          version: version
        }
      ])
    }
  }
}

export default processNotificationsUpdates
