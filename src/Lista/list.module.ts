import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ListRepository } from "./list.repository";
import { ListaController } from "./list.controller";
import { listProviders } from "./list.providers";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { usuarioProviders } from "../usuario/usuario.providers";
import { ItemRepository } from "../Item/item.repository";
import { itemProviders } from "../Item/item.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ListaController],
  providers: [ListRepository, UsuarioRepository, ItemRepository,
    ...listProviders,
    ...usuarioProviders,
    ...itemProviders]
})
export class ListModule {

}