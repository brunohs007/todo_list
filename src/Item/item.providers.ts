import { DataSource } from 'typeorm';
import { ItemEntity } from "./item.entity";

export const itemProviders = [
  {
    provide: 'ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ItemEntity),
    inject: ['DATA_SOURCE'],
  },
];