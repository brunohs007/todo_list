import { Inject, Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from 'typeorm';
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDto } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/AtualizaUsuario.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioRepository {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async salvar(dadosUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.password = bcrypt.hashSync(dadosUsuario.password, 8);
    usuarioEntity.nome = dadosUsuario.nome;
    return this.usuarioRepository.save(usuarioEntity)
  }

  async listar(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  async listarListas(userId: number) {
    const userMail = await this.buscaPorId(userId);
    if (userMail) {
      return this.usuarioRepository
        .createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.todo_list', 'todo_list')
        .where('usuario.id = :id', { id: userMail.id })
        .getMany();
    }
  }

  //dados parcialmente compativeis com UsuarioEntity
  async atualiza(id: number, dadosParaAtualizar: AtualizaUsuarioDto) {
    const usuario = this.buscaPorId(id);
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosParaAtualizar.email;
    usuarioEntity.password = bcrypt.hashSync(dadosParaAtualizar.password, 8);
    usuarioEntity.nome = dadosParaAtualizar.nome;

    await this.usuarioRepository.update({id}, usuarioEntity);

    return usuario;

  }

  async deleta(id:number) {
    const usuario = this.buscaPorId(id);
    await this.usuarioRepository.delete(id);

    return usuario;
  }

  buscaPorId(id:number){
    const possivelUsuario = this.usuarioRepository.findOne({ where: { id }});
    if (!possivelUsuario){
      throw new Error('Usuario nao encontrado');
    }
    return possivelUsuario;
  }

  async findOne(email: string): Promise<UsuarioEntity | undefined> {
    return this.usuarioRepository.findOne({where:{email:email}});
  }
}