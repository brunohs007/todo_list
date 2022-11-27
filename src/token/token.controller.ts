import { Body, Controller, Put } from "@nestjs/common";
import { AtualizaTokenDto } from "./dto/AtualizaToken.dto";
import { TokenRepository } from "./token.repository";

@Controller('/token')
export class TokenController{
  constructor(
    private tokenRepository: TokenRepository
  ) {}

  @Put('/atualiza')
  async atualiza(@Body() dadosAtualizados: AtualizaTokenDto){
    return this.tokenRepository.atualizaToken(dadosAtualizados.tokenAnterior)
  }
}