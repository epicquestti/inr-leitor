import { DataSource } from "typeorm"
import { Notificacoes } from "../../Entities"

const createNotificationToUpdate = async (
  db: DataSource,
  type: "A" | "U",
  appVersion: string,
  msg: string
) => {
  const todayDate = new Date()
  todayDate.setDate(todayDate.getDate() - 1)

  const notificacoesQueryBuilder = await db
    .getRepository(Notificacoes)
    .createQueryBuilder("notificacoes")

  const hasNotification = await notificacoesQueryBuilder.where(
    "notificacoes.type = :type AND notificacoes.version = :version AND notificacoes.createdAt >= :todayDate",
    {
      type: type,
      version: appVersion,
      todayDate: todayDate
    }
  )

  if (!hasNotification) {
    await notificacoesQueryBuilder.insert().values([
      {
        readed: false,
        createdAt: new Date(),
        text: msg,
        type: type,
        version: appVersion
      }
    ])
  }
}
export default createNotificationToUpdate
