import {
  Column,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { UsuarioEntity } from "../../usuario/usuario.entity";
import { ItemEntity } from "../../Item/item.entity";
import { ListaEntity } from "../list.entity";

@Entity()
export class CriaListaDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  usuario: typeof UsuarioEntity
}