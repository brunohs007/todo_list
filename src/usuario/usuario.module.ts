import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
// import { EmailUnicoValidator } from "./validacao/email-unico.validator";
import { DatabaseModule } from "../database/database.module";
import { usuarioProviders } from "./usuario.providers"

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [
    UsuarioRepository,
    // EmailUnicoValidator,
    ...usuarioProviders]
})
export class UsuarioModule {

}