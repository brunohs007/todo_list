export class ListaItemDto {
  constructor(
    readonly id: number,
    readonly  descricao: string,
    readonly  prioridade: boolean,
    readonly  check: boolean,
  ) {}
}