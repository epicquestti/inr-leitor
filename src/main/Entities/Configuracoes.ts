import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Configuracoes")
export default class Configuracoes {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  instanceName!: string

  @Column({ nullable: true })
  lastBeId!: number

  @Column({ nullable: true })
  lastClassId!: number

  @Column({ nullable: true })
  notifyClassificador!: boolean

  @Column({ nullable: true })
  notifyBoletim!: boolean
}
