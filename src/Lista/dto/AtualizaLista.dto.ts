import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { OneToMany } from "typeorm";
import { ItemEntity } from "../../Item/item.entity";
import { ListaEntity } from "../list.entity";

export class AtualizaListaDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @OneToMany(() => ItemEntity, () => ListaEntity)
  todo_item: ItemEntity;
}