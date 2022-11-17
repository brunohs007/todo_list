import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDto {

  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @IsEmail(undefined, { message: 'Email informado invalido'})
  //decorator criado
  @EmailUnico({message: 'Email ja cadastrado!'})
  email: string;

  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  @MaxLength(15, {message: 'A senha deve conter no maximo 15 caracteres'})
  senha: string;
}