import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.type';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private userService: UserService,
  ) {}

  async createNotification(content: string, userId: string) {
    try {
      const user = await this.userService.getUserById(userId);

      const newNotification = await this.notificationRepository.create({
        content,
        recipient: user,
        createdAt: Date.now().toString(),
      });

      await this.notificationRepository.save(newNotification);

      return newNotification;
    } catch (e) {
      throw new Error(`createNotification: invalid request ~ ${e}`);
    }
  }

  async getNotificationById(id: string) {
    try {
      const notification = await this.notificationRepository.findOneBy({ id });
      return notification;
    } catch (e) {
      throw new Error(`getNotificationById: invalid request ~ ${e}`);
    }
  }

  async getNotificationByUserId(id: string) {
    try {
      const notifications = await this.notificationRepository
        .createQueryBuilder('notification')
        .leftJoinAndSelect('notification.recipient', 'user')
        .where('user.id = :id', { id })
        .getMany();

      return notifications;
    } catch (e) {
      throw new Error(`getNotificationByUserId: invalid request ~ ${e}`);
    }
  }

  async deleteNotificationById(id: string) {
    try {
      await this.notificationRepository.delete({ id });
      return {
        message: 'Notification deleted',
      };
    } catch (e) {
      throw new Error(`deleteNotificationById: invalid request ~ ${e}`);
    }
  }
}
