import { Module } from '@nestjs/common';
import { UsuarioModule } from "./usuario/usuario.module";
import { ListModule } from "./Lista/list.module";

@Module({
  imports: [UsuarioModule, ListModule],
})
export class AppModule {}
