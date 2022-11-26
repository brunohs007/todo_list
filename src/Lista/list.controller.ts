import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { CriaListaDto } from "./dto/CriaLista.dto";
import { ListaTodosDto } from "./dto/ListaTodos.dto";
import { AtualizaListaDto } from "./dto/AtualizaLista.dto";

@Controller('/lista')
export class ListaController {

  constructor(private listRepository: ListRepository) {
  }

  @Post()
  async criaLista(@Body() dadosLista: CriaListaDto){
    return this.listRepository.salvar(dadosLista)
  }

  @Get()
  async listTodas() {
    const usuariosSalvos = await this.listRepository.listar();
    const listaTudo = usuariosSalvos.map(
      usuario => new ListaTodosDto(
        usuario.id,
        usuario.nome,
        usuario.descricao,
      )
    );
    return listaTudo
  }

  @Put('/:id')
  async atualizaLista(@Param('id') id:number, @Body() dadosAtualizar: AtualizaListaDto){
    const listaAtualizada = await this.listRepository.atualiza(id, dadosAtualizar);
    return{
      usuario: listaAtualizada,
      mensagem: 'usuario atualizado com sucesso!',
    }
  }

  @Delete('/:id')
  async removeLista(@Param('id') id:number) {
    const listaRemovida = await this.listRepository.deleta(id);

    return{
      usuario: listaRemovida,
      mensagem: 'Usuario removido com sucesso!'
    }
  }

}