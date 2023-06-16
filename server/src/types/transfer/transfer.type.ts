import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency, ICurrency } from '../currency/currency.type';

export interface ITransfer {
  id: string;
  currencySender: ICurrency;
  currencyRecipier: ICurrency;
  sum: number;
}

@Entity()
export class Transfer implements ITransfer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, default: 0 })
  sum: number;

  @ManyToOne(() => Currency, (currency: Currency) => currency.outTransfers)
  currencySender: ICurrency;

  @ManyToOne(() => Currency, (currency: Currency) => currency.inTransfers)
  currencyRecipier: ICurrency;
}
