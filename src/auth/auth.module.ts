import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { jwtConstants } from "./constants";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { TokenModule } from "../token/token.module";

@Module({
  imports: [UsuarioModule, PassportModule, TokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService]
  })
export class AuthModule {}
