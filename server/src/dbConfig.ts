import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './types/user/user.type';
import { Player } from './types/player/player.type';
import { Table } from './types/table/table.type';
import { Currency } from './types/currency/currency.type';
import { Transfer } from './types/transfer/transfer.type';
import { Notification } from './types/notification/notification.type';

export const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  entities: [
    'dist/**/*.entity{.ts,.js}',
    User,
    Player,
    Table,
    Currency,
    Transfer,
    Notification,
  ],
  synchronize: true,
  logging: true,
  dropSchema: false,
};
