import { DataSource } from 'typeorm';
import { TokenEntity } from "./token.entity";

export const tokenProviders = [
  {
    provide: 'TOKEN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TokenEntity),
    inject: ['DATA_SOURCE'],
  },
];