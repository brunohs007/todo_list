import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ListaEntity } from "./list.entity";
import { CriaListaDto } from "./dto/CriaLista.dto";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { AtualizaUsuarioDto } from "../usuario/dto/AtualizaUsuario.dto";
import { AtualizaListaDto } from "./dto/AtualizaLista.dto";

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

  async listar(): Promise<ListaEntity[]> {
    return this.listRepository.find();
  }

  //dados parcialmente compativeis com UsuarioEntity
  async atualiza(id: number, dadosParaAtualizar: AtualizaListaDto) {
    const usuario = this.buscaPorId(id);
    const listaEntity = new ListaEntity();
    listaEntity.nome = dadosParaAtualizar.nome;
    listaEntity.descricao = dadosParaAtualizar.descricao;

    await this.listRepository.update({id}, listaEntity);

    return usuario;

  }

  async deleta(id:number) {
    const usuario = this.buscaPorId(id);
    await this.listRepository.delete(id);

    return usuario;
  }

  private buscaPorId(id:number){
    const possivelLista = this.listRepository.findOne({ where: { id }});
    if (!possivelLista){
      throw new Error('Usuario nao encontrado');
    }
    return possivelLista;
  }
}