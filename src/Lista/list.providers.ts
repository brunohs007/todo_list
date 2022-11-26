import { DataSource } from 'typeorm';
import { ListaEntity } from "./list.entity";

export const listProviders = [
  {
    provide: 'LISTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ListaEntity),
    inject: ['DATA_SOURCE'],
  },
];