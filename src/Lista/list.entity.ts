import { UsuarioEntity } from '../usuario/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from "class-validator";

@Entity()
export class ProdutoEntity {
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