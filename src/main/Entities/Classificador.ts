import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Classificador")
export default class Classificador {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 200, nullable: false })
  title!: string

  @Column({ nullable: false })
  criadoEm!: Date

  @Column({ nullable: false })
  publicadoEm!: Date

  @Column({ length: 1, nullable: false })
  read!: string
}
