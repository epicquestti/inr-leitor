import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { Boletim } from "."

@Entity("BoletimContents")
export default class BoletimContents {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 200, nullable: false })
  text!: string

  @Column({ length: 500, nullable: false })
  url!: string

  @Column({ length: 60, nullable: false })
  tipo!: string

  @ManyToOne(_type => Boletim)
  @JoinColumn()
  boletim!: Boletim
}
