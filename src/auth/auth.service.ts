import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from "../usuario/usuario.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { TokenRepository } from "../token/token.repository";

@Injectable()
export class AuthService {
  constructor(private usuarioRepository: UsuarioRepository,
              private jwtService: JwtService,
              private tokeRepository: TokenRepository) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne(email);
    if (usuario && bcrypt.compare(senha, usuario.password)) {
      const {password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload)
    this.tokeRepository.save(token, user.email)
    return {
      access_token: token
    };
  }
}