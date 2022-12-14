import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ItemEntity } from "./item.entity";
import { CriaItemDto } from "./dto/CriaItem.dto";
import { AtualizaListaDto } from "../Lista/dto/AtualizaLista.dto";
import { AtualizaItemDto } from "./dto/AtualizaItem.dto";
import { ListRepository } from "../Lista/list.repository";

@Injectable()
export class ItemRepository {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<ItemEntity>,
    private listRepository: ListRepository,
  ) {}


  async salvar(dadosItem: CriaItemDto) {
    const listEntity = await this.listRepository.buscaPorId(+dadosItem.todo_list)
    const itemEntity = new ItemEntity();
    itemEntity.id = dadosItem.id;
    itemEntity.descricao = dadosItem.descricao;
    itemEntity.prioridade = dadosItem.prioridade;
    itemEntity.check = dadosItem.check;
    return this.itemRepository.save(itemEntity)
  }

  async listar(): Promise<ItemEntity[]> {
    return this.itemRepository.find();
  }

  // //dados parcialmente compativeis com UsuarioEntity
  async atualiza(id: number, dadosParaAtualizar: AtualizaItemDto) {
    const item = this.buscaPorId(id);
    const itemEntity = new ItemEntity();
    itemEntity.descricao = dadosParaAtualizar.descricao;
    itemEntity.prioridade = dadosParaAtualizar.prioridade;
    itemEntity.check = dadosParaAtualizar.check;

    await this.itemRepository.update({id}, itemEntity);

    return item;

  }

  async deleta(id:number) {
    const item = this.buscaPorId(id);
    await this.itemRepository.delete(id);

    return item;
  }

  private buscaPorId(id:number){
    const possivelItem = this.itemRepository.findOne({ where: { id }});
    if (!possivelItem){
      throw new Error('Item nao encontrado');
    }
    return possivelItem;
  }
}