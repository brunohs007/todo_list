import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [UsuarioModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
