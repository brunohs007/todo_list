import { Body, Controller, Post, Get } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuariorepository: UsuarioRepository) {
  }

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDto) {
    await this.usuariorepository.salvar(dadosUsuario)
    return dadosUsuario;
  }

  @Get()
  async listUsuarios() {
    return this.usuariorepository.listar();
  }

}