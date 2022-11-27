import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { TokenEntity } from "./token.entity";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class TokenRepository {

  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<TokenEntity>,
    private usuarioRepository: UsuarioRepository,
    @Inject(forwardRef(() => AuthService))
    private authRepository: AuthService
  ) {}

  async save(hash: string, usuario: string){
    let tokenUser = await this.tokenRepository.findOne({where:{usuario: usuario}})
    if (tokenUser){
      await this.tokenRepository.update(tokenUser.id, {
        hash: hash
      })
    }else{
      await this.tokenRepository.insert({
        hash: hash,
        usuario: usuario
      })
    }
  }

  async atualizaToken(tokenAnterior: string){
    let tokenUser = await this.tokenRepository.findOne({where:{ hash: tokenAnterior }})
    if (tokenUser){
      let usuario = await this.usuarioRepository.findOne(tokenUser.usuario)
      return this.authRepository.login(usuario)
    }else{ //requisição inválida
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

}