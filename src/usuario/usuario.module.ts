import { forwardRef, Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { DatabaseModule } from "../database/database.module";
import { usuarioProviders } from "./usuario.providers"
import { AuthModule } from "../auth/auth.module";
import { ListRepository } from "../Lista/list.repository";
import { listProviders } from "../Lista/list.providers";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [
    UsuarioRepository, ListRepository,
    ...usuarioProviders,
    ...listProviders],
  exports: [UsuarioRepository]
})
export class UsuarioModule {

}