import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Currency, ICurrency } from '../currency/currency.type';
import { ITable, Table } from '../table/table.type';
import { IUser, User } from '../user/user.type';
import { IProperty, Property } from '../property/property.type';

export interface IPlayer {
  id: string;
  role: number;
  user: IUser;
  table: ITable;
  currencies: ICurrency[];
}

@Entity()
export class Player implements IPlayer {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 0 })
  role: number;

  @ManyToOne(() => User, (user: User) => user.players)
  user: IUser;

  @ManyToOne(() => Table, (table: Table) => table.players)
  table: ITable;

  @OneToMany(() => Currency, (currency: Currency) => currency.player)
  currencies: ICurrency[];
}
