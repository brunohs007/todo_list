import { Module } from '@nestjs/common';
import { UsuarioModule } from "./usuario/usuario.module";
import { ListModule } from "./Lista/list.module";
import { ItemModule } from "./Item/item.module";
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [ListModule, ItemModule, AuthModule, DatabaseModule, UploadModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),],
})
export class AppModule {}
