import { Module } from '@nestjs/common';
import { UsuarioModule } from "./usuario/usuario.module";
import { ListModule } from "./Lista/list.module";
import { ItemModule } from "./Item/item.module";
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [ListModule, ItemModule, AuthModule, DatabaseModule],
})
export class AppModule {}
