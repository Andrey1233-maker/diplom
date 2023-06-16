import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUser, User } from '../user/user.type';

export interface INotification {
  id: string;
  content: string;
  recipient: IUser;
  createdAt: string;
  isReaded: boolean;
}

@Entity()
export class Notification implements INotification {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  content: string;

  @Column({ default: false })
  isReaded: boolean;

  @Column({ nullable: false })
  createdAt: string;

  @ManyToOne(() => User, (user: User) => user.inNotifications)
  recipient: IUser;
}
