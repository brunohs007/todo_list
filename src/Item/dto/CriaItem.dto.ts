import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ListaEntity } from "../../Lista/list.entity";

@Entity()
export class CriaItemDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  todo_list: typeof ListaEntity;

  @IsBoolean()
  prioridade: boolean;

  @IsBoolean()
  check: boolean;


}