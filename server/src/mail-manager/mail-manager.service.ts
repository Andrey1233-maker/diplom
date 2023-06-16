import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailManagerService {
  constructor(private mailerService: MailerService) {}

  async sendMailNotification(userEmail: string, message: string) {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Уведомление',
        template: './NotificationTemplate',
        context: {
          content: message,
        },
      });
    } catch (e) {
      throw new Error(`sendMailNotification: invalid request ~ ${e}`);
    }
  }

  async sendConfirmNotification(token: string, userEmail: string) {
    try {
      const url = `http://localhost:3000/token/${token}`;

      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Уведомление',
        template: './ConfirmTemplate',
        context: {
          content:
            'Для подтверждения регистрации переёдите по ссылке, если вы не регестрировались игнорируйте письмо',
          url,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error(`sendConfirmNotification: invalid request ~ ${e}`);
    }
  }
}
