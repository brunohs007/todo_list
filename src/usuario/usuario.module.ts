import { forwardRef, Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { DatabaseModule } from "../database/database.module";
import { usuarioProviders } from "./usuario.providers"
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [
    UsuarioRepository,
    ...usuarioProviders],
  exports: [UsuarioRepository]
})
export class UsuarioModule {

}