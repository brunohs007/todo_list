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

  @ManyToOne(() => ListaEntity, (todo_list) => todo_list.todo_item, { eager: true,  onDelete: "CASCADE"})
  todo_list = ListaEntity;

  @Column({ default: false})
  prioridade: boolean;

  @Column({default: false})
  check: boolean;


}