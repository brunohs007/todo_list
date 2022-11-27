import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from "class-validator";
import { ListaEntity } from "../Lista/list.entity";

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => ListaEntity)
  nome: ListaEntity;

  @Column({ type: 'boolean' })
  prioridade: boolean;

  @Column({ type: 'boolean' })
  check: boolean;


}