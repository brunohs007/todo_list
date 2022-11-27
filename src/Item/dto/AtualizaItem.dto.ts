import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AtualizaItemDto {

  @IsOptional()
  @IsString()
  descricao: string;

  @IsOptional()
  prioridade: boolean;

  @IsOptional()
  check: boolean;
}