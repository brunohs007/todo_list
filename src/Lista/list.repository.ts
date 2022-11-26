import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ListaEntity } from "./list.entity";
import { CriaListaDto } from "./dto/CriaLista.dto";

@Injectable()
export class ListRepository {
  constructor(
    @Inject('LISTA_REPOSITORY')
    private listRepository: Repository<ListaEntity>,
  ) {}


  salvar(dadosLista: CriaListaDto) {
    const listaEntity = new ListaEntity();
    listaEntity.usuario = dadosLista.usuario;
    listaEntity.id = dadosLista.id;
    listaEntity.nome = dadosLista.nome;
    listaEntity.descricao = dadosLista.descricao;
    return this.listRepository.save(listaEntity)
  }
}