import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ListaEntity } from "./list.entity";
import { CriaListaDto } from "./dto/CriaLista.dto";
import { AtualizaListaDto } from "./dto/AtualizaLista.dto";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { UsuarioEntity } from "../usuario/usuario.entity";

@Injectable()
export class ListRepository {
  constructor(
    @Inject('LISTA_REPOSITORY')
    private listRepository: Repository<ListaEntity>,
    private usuarioRepository: UsuarioRepository
  ) {}


  async salvar(dadosLista: CriaListaDto, email: string) {
    const findEmail = await this.usuarioRepository.findOne(email)
    if (findEmail){
      const listaEntity = new ListaEntity();
      listaEntity.id = dadosLista.id;
      listaEntity.nome = dadosLista.nome;
      return this.listRepository.save(listaEntity)
    }else{
      throw new Error("Usuario não encontrado")
    }
  }

  async listar(): Promise<ListaEntity[]> {
    return this.listRepository.find();
  }

  //dados parcialmente compativeis com UsuarioEntity
  async atualiza(id: number, dadosParaAtualizar: AtualizaListaDto) {
    const usuario = this.buscaPorId(id);
    const listaEntity = new ListaEntity();
    listaEntity.nome = dadosParaAtualizar.nome;
    listaEntity.todo_item = dadosParaAtualizar.todo_item;

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