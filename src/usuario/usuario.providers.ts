import { DataSource } from 'typeorm';
import { UsuarioEntity } from './validacao/usuario.entity';

export const usuarioProviders = [
  {
    provide: 'USUARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UsuarioEntity),
    inject: ['DATA_SOURCE'],
  },
];