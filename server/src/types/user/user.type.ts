import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { INotification, Notification } from '../notification/notification.type';
import { IPlayer, Player } from '../player/player.type';

export interface IUser {
  id: string;
  name: string;
  email: string;
  auth_key: string;
  isGoogleAuth: boolean;
  picture?: string;
  inNotifications: INotification[];
  players: IPlayer[];
  isConfirmed: boolean;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 'Без имени', nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  auth_key: string;

  @Column({ default: false, nullable: false })
  isGoogleAuth: boolean;

  @Column({ default: false, nullable: false })
  isConfirmed: boolean;

  @Column({ default: null, nullable: true })
  picture: string;

  @OneToMany(
    () => Notification,
    (notification: Notification) => notification.recipient,
  )
  inNotifications: INotification[];

  @OneToMany(() => Player, (player: Player) => player.user)
  players: IPlayer[];
}
