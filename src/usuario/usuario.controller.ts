import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./validacao/usuario.entity";
import { v4 as uuid} from 'uuid';
import { ListaUsuarioDto } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuariorepository: UsuarioRepository) {
  }

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDto):Promise<ListaUsuarioDto> {

    //usuarioEntity.id = uuid();
    return this.usuariorepository.salvar(dadosUsuario)
    // return {
    //   usuario : new ListaUsuarioDto(
    //     usuarioEntity.id,
    //     usuarioEntity.nome,
    //   ),
    //   mensagem: 'usuario criado com sucesso'
    // }
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

}