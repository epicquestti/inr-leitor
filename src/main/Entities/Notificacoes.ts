import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Notificacoes")
export default class Notificacoes {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  createdAt!: Date

  @Column({ nullable: false })
  text!: string

  @Column({ nullable: false, length: 1 })
  type!: string

  @Column({ nullable: false })
  readed!: boolean

  @Column({ nullable: true })
  relatedDocumentId!: number

  @Column({ nullable: true })
  version!: string

  @Column({ nullable: true })
  link!: string
}
