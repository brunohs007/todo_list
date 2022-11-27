import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ListaEntity } from "../../Lista/list.entity";

@Entity()
export class CriaItemDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  descricao: string;

  @ManyToOne(() => ListaEntity)
  nome: ListaEntity;

  @IsBoolean()
  prioridade: boolean;

  @IsBoolean()
  check: boolean;


}