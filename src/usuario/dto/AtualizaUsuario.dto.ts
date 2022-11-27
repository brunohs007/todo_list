import { IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class AtualizaUsuarioDto {

  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'Email informado invalido'})
  @IsOptional()
  email: string;

  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  @MaxLength(15, {message: 'A senha deve conter no maximo 15 caracteres'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#]).*$/, {
    message: 'Senha precisa de uma letra maiúscula, um caractere especial, pelo menos 6 caracteres e até 15 caracteres',
  })
  @IsOptional()
  senha: string;
}