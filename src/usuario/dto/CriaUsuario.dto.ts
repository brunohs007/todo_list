import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CriaUsuarioDto {

  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @IsEmail(undefined, { message: 'Email informado invalido'})
  email: string;

  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  @MaxLength(15, {message: 'A senha deve conter no maximo 15 caracteres'})
  senha: string;
}