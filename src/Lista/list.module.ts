import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ListRepository } from "./list.repository";
import { ListaController } from "./list.controller";
import { listProviders } from "./list.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ListaController],
  providers: [ListRepository,
    ...listProviders]
})
export class ListModule {

}