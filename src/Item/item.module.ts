import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { itemProviders } from "./item.providers";
import { ItemController } from "./item.controller";
import { ItemRepository } from "./item.repository";
import { ListRepository } from "../Lista/list.repository";
import { listProviders } from "../Lista/list.providers";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { usuarioProviders } from "../usuario/usuario.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [ItemRepository,ListRepository, UsuarioRepository,
    ...itemProviders,
    ...listProviders,
    ...usuarioProviders]
})
export class ItemModule {

}