import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { ListRepository } from "./list.repository";
import { CriaListaDto } from "./dto/CriaLista.dto";

@Controller('/lista')
export class ListaController {

  constructor(private listRepository: ListRepository) {
  }

  @Post()
  async criaLista(@Body() dadosLista: CriaListaDto){
    return this.listRepository.salvar(dadosLista)
  }

  // @Get()
  // async listTodas() {
  //   const usuariosSalvos = await this.usuariorepository.listar();
  //   const listaTudo = usuariosSalvos.map(
  //     usuario => new ListaUsuarioDto(
  //       usuario.id,
  //       usuario.nome,
  //     )
  //   );
  //   return listaTudo
  // }
  //
  // @Put('/:id')
  // async atualizaUsuario(@Param('id') id:number, @Body() dadosAtualizar: AtualizaUsuarioDto){
  //   const usuarioAtualizado = await this.usuariorepository.atualiza(id, dadosAtualizar);
  //
  //   return{
  //     usuario: usuarioAtualizado,
  //     mensagem: 'usuario atualizado com sucesso!',
  //   }
  // }
  //
  // @Delete('/:id')
  // async removeUsuario(@Param('id') id:number) {
  //   const usuarioRemovido = await this.usuariorepository.deleta(id);
  //
  //   return{
  //     usuario: usuarioRemovido,
  //     mensagem: 'Usuario removido com sucesso!'
  //   }
  // }

}