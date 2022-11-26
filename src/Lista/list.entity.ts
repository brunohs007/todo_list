import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from "class-validator";
import { UsuarioEntity } from "../usuario/usuario.entity";

@Entity()
export class ListaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity)
  usuario: UsuarioEntity;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @Column({ type: 'text' })
  descricao: string;
}