import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDto {

  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @IsEmail(undefined, { message: 'Email informado invalido'})
  //decorator criado
  @EmailUnico({message: 'Email ja cadastrado!'})
  email: string;

  @MinLength(6, {message: 'A senha deve ter 6 caracteres'})
  senha: string;
}