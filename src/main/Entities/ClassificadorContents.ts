import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { Classificador } from "."

@Entity("ClassificadorContents")
export default class ClassificadorContents {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_type => Classificador)
  @JoinColumn()
  classificador!: Classificador

  @Column({ length: 100, nullable: false })
  tipo!: string

  @Column({ nullable: true })
  url!: string

  @Column({ nullable: true })
  text!: string
}
