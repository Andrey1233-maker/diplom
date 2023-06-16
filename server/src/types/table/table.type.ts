import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency, ICurrency } from '../currency/currency.type';
import { IPlayer, Player } from '../player/player.type';

export interface ITable {
  id: string;
  title: string;
  description: string;
  style: string;
  players: IPlayer[];
}

@Entity()
export class Table implements ITable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({})
  title: string;

  @Column({})
  description: string;

  @Column({})
  style: string;

  @OneToMany(() => Player, (player: Player) => player.table)
  players: IPlayer[];
}
