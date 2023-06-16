import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ITable, Table } from '../table/table.type';
import { ITransfer, Transfer } from '../transfer/transfer.type';
import { IPlayer, Player } from '../player/player.type';

export interface ICurrency {
  id: string;
  balance: number;
  player: IPlayer;
  number: string;
}

@Entity()
export class Currency implements ICurrency {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @Column({ nullable: false, default: 0 })
  style: number;

  @Column({ nullable: false, default: '1111' })
  number: string;

  @ManyToOne(() => Player, (player: Player) => player.currencies)
  player: IPlayer;

  @OneToMany(() => Transfer, (transfer: Transfer) => transfer.currencySender)
  outTransfers: ITransfer[];

  @OneToMany(() => Transfer, (transfer: Transfer) => transfer.currencyRecipier)
  inTransfers: ITransfer[];
}
