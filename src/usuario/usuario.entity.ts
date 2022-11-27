import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

@Entity()
export class UsuarioEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @Column({ length: 100, unique: true })
  @IsEmail(undefined, { message: 'Email informado invalido'})
  email: string;

  @Column({ length: 255 })
  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  @MaxLength(15, {message: 'A senha deve conter no maximo 15 caracteres'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#]).*$/, {
    message: 'Senha precisa de uma letra maiúscula, um caractere especial, pelo menos 6 caracteres e até 15 caracteres',
  })
  password: string;
}