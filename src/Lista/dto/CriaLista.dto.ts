import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from "class-validator";
import { UsuarioEntity } from "../../usuario/usuario.entity";

@Entity()
export class CriaListaDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity)
  usuario: UsuarioEntity;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @IsString()
  descricao: string;
}