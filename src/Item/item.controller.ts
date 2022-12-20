import { Body, Controller, Post, Get, Put, Param, Delete, UseGuards } from "@nestjs/common";
import { CriaItemDto } from "./dto/CriaItem.dto";
import { ItemRepository } from "./item.repository";
import { ListaItemDto } from "./dto/ListaItem.dto";
import { AtualizaItemDto } from "./dto/AtualizaItem.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/item')
export class ItemController {

  constructor(private itemRepository: ItemRepository) {
  }

  @Post()
  async criaItem(@Body() dadosItem: CriaItemDto){
    return this.itemRepository.salvar(dadosItem)
  }

  @Get()
  async listItem() {
    const itemSalvos = await this.itemRepository.listar();
    const listaItem = itemSalvos.map(
      item => new ListaItemDto(
        item.id,
        item.descricao,
        item.prioridade,
        item.check,
      )
    );
    return listaItem
  }

  @Put('/:id')
  async atualizaItem(@Param('id') id:number, @Body() dadosAtualizar: AtualizaItemDto){
    return this.itemRepository.atualiza(id, dadosAtualizar);
  }

  @Delete('/:id')
  async removeLista(@Param('id') id:number) {
    const itemRemovida = await this.itemRepository.deleta(id);

    return{
      usuario: itemRemovida,
      mensagem: 'Usuario removido com sucesso!'
    }
  }

}