import { Body, Controller, Post, Get, Put, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { ListaUsuarioDto } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/AtualizaUsuario.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuariorepository: UsuarioRepository) {
  }

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDto){
    return this.usuariorepository.salvar(dadosUsuario)
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuariorepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDto(
        usuario.id,
        usuario.nome,
      )
    );
    return usuariosLista
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id:number, @Body() dadosAtualizar: AtualizaUsuarioDto){
    const usuarioAtualizado = await this.usuariorepository.atualiza(id, dadosAtualizar);

    return{
      usuario: usuarioAtualizado,
      mensagem: 'usuario atualizado com sucesso!',
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id:number) {
    const usuarioRemovido = await this.usuariorepository.deleta(id);

    return{
      usuario: usuarioRemovido,
      mensagem: 'Usuario removido com sucesso!'
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

}