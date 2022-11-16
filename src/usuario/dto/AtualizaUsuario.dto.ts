import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
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

  @MinLength(6, {message: 'A senha deve ter 6 caracteres'})
  @IsOptional()
  senha: string;
}