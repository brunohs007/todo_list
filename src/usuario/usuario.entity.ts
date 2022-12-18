import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { ListaEntity } from "../Lista/list.entity";

@Entity()
export class UsuarioEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @Column({ length: 100, unique: true })
  @IsEmail( { message: 'Email informado invalido'})
  email: string;

  @Column({ length: 255 })
  @MinLength(6)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])(?=.[0-9]).*$/, {
    message: 'Senha precisa de uma letra maiúscula, um numero, um caractere especial, pelo menos 6 caracteres e até 15 caracteres',
  })
  password: string;

  @OneToMany(() => ListaEntity, (todo_list) => todo_list.usuario)
  todo_list: ListaEntity[];
}