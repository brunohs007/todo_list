import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from "../usuario/usuario.repository";
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne(email);
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      const {senha, ...result } = usuario;
      return result;
    }
    return null;
  }
}