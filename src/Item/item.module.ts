import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { itemProviders } from "./item.providers";
import { ItemController } from "./item.controller";
import { ItemRepository } from "./item.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [ItemRepository,
    ...itemProviders]
})
export class ItemModule {

}