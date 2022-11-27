import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#]).*$/, {
    message: 'Senha precisa de uma letra maiúscula, um caractere especial, pelo menos 6 caracteres e até 15 caracteres',
  })
  password: string;
}