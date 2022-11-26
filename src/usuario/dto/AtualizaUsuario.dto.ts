import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class AtualizaUsuarioDto {

  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'Email informado invalido'})
  //decorator criado
  @EmailUnico({message: 'Email ja cadastrado!'})
  @IsOptional()
  email: string;

  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  @MaxLength(15, {message: 'A senha deve conter no maximo 15 caracteres'})
  @IsOptional()
  senha: string;
}