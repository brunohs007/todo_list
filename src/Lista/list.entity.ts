import {
  Column,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { ItemEntity } from "../Item/item.entity";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class ListaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne( () => UsuarioEntity, (usuario) => usuario.todo_list, { eager: true })
  usuario: UsuarioEntity;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @OneToMany(() => ItemEntity, () => ListaEntity)
  todo_item: ItemEntity;
}