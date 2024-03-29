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


  async salvar(dadosLista: CriaListaDto, userId: number) {
    const user = await this.usuarioRepository.buscaPorId(userId)
    if (user){
      const listaEntity = { usuario: user.id, ...dadosLista}

      await this.listRepository.save(listaEntity)
    }else{
      throw new Error("Usuario não encontrado")
    }
  }

  async listar(): Promise<ListaEntity[]> {
    return this.listRepository.find();
  }

  async listarItens(id: number){
    return this.listRepository.createQueryBuilder('todo_list')
      .leftJoinAndSelect('todo_list.todo_item', 'todo_item')
      .where("todo_list.id = :id", {id: id})
      .getMany()
  }

  //dados parcialmente compativeis com UsuarioEntity
  async atualiza(id: number, dadosParaAtualizar: AtualizaListaDto, userId: number) {
    const user = await this.usuarioRepository.buscaPorId(userId)
    if (user){
      const listaEntity = { usuario: user.id, ...dadosParaAtualizar}
      await this.listRepository.update(id, listaEntity)
    }else{
      throw new Error("Usuario não encontrado")
    }
  }

  async deleta(id:number) {
    const usuario = this.buscaPorId(id);
    await this.listRepository.delete(id);

    return usuario;
  }

  async buscaPorId(id:number){
    const possivelLista = this.listRepository.findOne({ where: { id }});
    if (!possivelLista){
      throw new Error('Usuario nao encontrado');
    }
    return possivelLista;
  }

}