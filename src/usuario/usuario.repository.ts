import { Inject, Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from 'typeorm';
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDto } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioRepository {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async salvar(dadosUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.id = dadosUsuario.id;
    return this.usuarioRepository.save(usuarioEntity)
  }

  async listar(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  //dados parcialmente compativeis com UsuarioEntity
  async atualiza(id: number, dadosParaAtualizar: AtualizaUsuarioDto) {
    const usuario = this.buscaPorId(id);
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosParaAtualizar.email;
    usuarioEntity.senha = dadosParaAtualizar.senha;
    usuarioEntity.nome = dadosParaAtualizar.nome;

    await this.usuarioRepository.update({id}, usuarioEntity);

    return usuario;

  }

  async deleta(id:number) {
    const usuario = this.buscaPorId(id);
    await this.usuarioRepository.delete(id);

    return usuario;
  }

  private buscaPorId(id:number){
    const possivelUsuario = this.usuarioRepository.findOne({ where: { id }});
    if (!possivelUsuario){
      throw new Error('Usuario nao encontrado');
    }
    return possivelUsuario;
  }

  // async existeComEmail(email: string, dadosUsuario: CriaUsuarioDto) {
  //   const usuarioEntity = new UsuarioEntity();
  //   usuarioEntity.email === dadosUsuario.email;
  //   // const possivelUsuario = this.usuarioRepository.find(
  //   //   usuarioEntity => usuarioEntity.email === email
  //   // );
  //   return usuarioEntity !== undefined;
  // }
}