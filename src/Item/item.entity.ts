import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from "class-validator";
import { ListaEntity } from "../Lista/list.entity";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => ListaEntity, () => ItemEntity)
  todo_list: ListaEntity;

  @Column({ type: 'boolean' })
  prioridade: boolean;

  @Column({ type: 'boolean' })
  check: boolean;


}