import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { EmailUnico } from "./validacao/email-unico.validator";

@Entity()
export class UsuarioEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @Column({ length: 100 })
  @IsEmail(undefined, { message: 'Email informado invalido'})
  //decorator criado
  @EmailUnico({message: 'Email ja cadastrado!'})
  email: string;

  @Column({ length: 255 })
  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  @MaxLength(15, {message: 'A senha deve conter no maximo 15 caracteres'})
  senha: string;
}