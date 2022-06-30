import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Favoritos")
export default class Favoritos {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: false })
  tipoFavorito!: string

  @Column({ nullable: true })
  idFavorito!: number
}
