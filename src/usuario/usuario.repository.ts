import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./validacao/usuario.entity";

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar(){
    return this.usuarios;
  }

  async existeComEmail(email: string){
    const possivelUsuario = this.usuarios.find(
      usuario => usuario.email == email
    );
    return possivelUsuario !== undefined;
  }

  async atualiza(id: string, dadosParaAtualizar: Partial<UsuarioEntity>) {
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

  async deleta(id:string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
    );

    return usuario;
  }


  private buscaPorId(id:string){
    const possivelUsuario = this.usuarios.find(
      usuarioBuscado => usuarioBuscado.id === id
    );

    if (!possivelUsuario){
      throw new Error('Usuario nao encontrado');
    }

    return possivelUsuario;
  }
}