import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from "../usuario/usuario.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usuarioRepository: UsuarioRepository,
              private jwtService: JwtService) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne(email);
    if (usuario && bcrypt.compare(senha, usuario.password)) {
      const {password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}