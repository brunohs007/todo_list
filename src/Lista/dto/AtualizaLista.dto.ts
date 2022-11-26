import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AtualizaListaDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio]'})
  nome: string;

  @IsOptional()
  @IsString()
  descricao: string;
}