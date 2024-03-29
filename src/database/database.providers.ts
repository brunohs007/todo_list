import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        // host: 'database-1.cydbbxlxmakq.sa-east-1.rds.amazonaws.com',
        host: 'localhost',
        port: 3306,
        username: 'bruno',
        password: '12345678',
        database: 'db',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      // const dataSource = new DataSource({
      //   type: 'mysql',
      //   host: process.env.DB_HOST,
      //   port: +process.env.DB_PORT,
      //   username: process.env.DB_USERNAME,
      //   password: process.env.DB_PASSWORD,
      //   database: process.env.DB_NAME,
      //   entities: [
      //     __dirname + '/../**/*.entity{.ts,.js}',
      //   ],
      //   synchronize: process.env.DB_SYNC == "true",
      // });

      return dataSource.initialize();
    },
  },
];