import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthModule } from "../auth/auth.module";
import { TokenRepository } from "./token.repository";
import { tokenProviders } from "./token.providers";
import { TokenController } from "./token.controller";
import { UsuarioModule } from "../usuario/usuario.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), UsuarioModule],
  controllers: [TokenController],
  providers: [
    TokenRepository,
    ...tokenProviders],
  exports: [TokenRepository]
})
export class TokenModule {

}