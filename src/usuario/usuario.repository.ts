import { Inject, Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./validacao/usuario.entity";
import { Repository } from 'typeorm';
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDto } from "./dto/ListaUsuario.dto";

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listar(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  // private usuarios: UsuarioEntity[] = [];

  async salvar(dadosUsuario: CriaUsuarioDto): Promise<any> {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.id = dadosUsuario.id;
    this.usuarioRepository.save(usuarioEntity)
      .then((result) => {
        return <any> {
          usuario : new ListaUsuarioDto(
            dadosUsuario.id,
            dadosUsuario.nome,
          ),
          mensagem: 'usuario criado com sucesso'
        }
      })
      .catch((error) => {
        return {
          mensagem: 'erro ao cadastrar usuario'
        }
      })
  }

  // async listar(){
  //   return this.usuarios;
  // }
  // async existeComEmail(email: string){
  //   const possivelUsuario = this.usuarios.find(
  //     usuario => usuario.email == email
  //   );
  //   return possivelUsuario !== undefined;
  // }

  async atualiza(id: number, dadosParaAtualizar: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    if (!usuario){
      throw new Error('Usuario nao encontrado');
    }

    Object.entries(dadosParaAtualizar).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      usuario[chave] = valor;
    });

    return usuario;

  }

  async deleta(id:number) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
    );

    return usuario;
  }


  private buscaPorId(id:number){
    const possivelUsuario = this.usuarios.find(
      usuarioBuscado => usuarioBuscado.id === id
    );

    if (!possivelUsuario){
      throw new Error('Usuario nao encontrado');
    }

    return possivelUsuario;
  }
}