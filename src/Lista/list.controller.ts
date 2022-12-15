import { Body, Controller, Post, Get, Put, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { CriaListaDto } from "./dto/CriaLista.dto";
import { ListaTodosDto } from "./dto/ListaTodos.dto";
import { AtualizaListaDto } from "./dto/AtualizaLista.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/lista')
export class ListaController {

  constructor(private listRepository: ListRepository) {
  }

  @Post()
  async criaLista(@Body() dadosLista: CriaListaDto, @Request() req){
    return this.listRepository.salvar(dadosLista, req.user.email)
  }

  @Get()
  async listTodas(@Request() req) {
    const usuariosSalvos = await this.listRepository.listar();
    const listaTudo = usuariosSalvos.map(
      usuario => new ListaTodosDto(
        usuario.id,
        usuario.nome,
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