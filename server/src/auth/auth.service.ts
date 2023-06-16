import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailManagerService } from 'src/mail-manager/mail-manager.service';
import { NotificationService } from 'src/types/notification/notification.service';
import { ICreateUserDTO, IGoogleUserDTO } from 'src/types/user/dto/user.dto';
import { UserService } from 'src/types/user/user.service';
import { IUser } from 'src/types/user/user.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private jwtService: JwtService,
    private mailService: MailManagerService,
    private notificationService: NotificationService,
  ) {}

  async validateGoogleAccount(res): Promise<IUser> {
    try {
      // запрос токена по коду полученному после авторизации в google
      const token = await this.httpService
        .post('https://accounts.google.com/o/oauth2/token', {
          client_id: '724831104412-3j4keepifvf6n3jdes2ti455v0ick2lp.apps.googleusercontent.com',
          client_secret: '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',
          redirect_uri: 'http://localhost:5000/auth/google/callback',
          grant_type: 'authorization_code',
          code: res.code,
        })
        .toPromise();

      // получение данных о пользователе из google
      const user = await this.httpService
        .get('https://www.googleapis.com/oauth2/v1/userinfo', {
          headers: {
            Authorization: `Bearer ${token.data.access_token}`,
          },
        })
        .toPromise();

      console.log(user);
      const userOnSystem = await this.userService.findOrCreateGoogleUser(
        user.data as IGoogleUserDTO,
      );

      return userOnSystem;
    } catch (e) {
      throw new Error(`validateGoogleAccount: invalid request ~ ${e}`);
    }
  }

  // валиация обычного пользователя
  async validateDefaultAccount(email: string, password: string) {
    try {
      const currentUser = await this.userService.getUserByEmail(email);
      // проверка пользователя на существование
      if (
        !currentUser ||
        currentUser.isGoogleAuth ||
        !currentUser.isConfirmed
      ) {
        return {
          message: 'Пользователь не найден',
          error: true,
        };
      }
      // проверка правильности пароля
      if (!currentUser.auth_key.includes(password)) {
        return {
          message: 'Неверный пароль',
          error: true,
        };
      }

      const token = await this.login(currentUser);
      return token;
    } catch (e) {
      throw new Error(`validateDefaultAccount: invalid request ~ ${e}`);
    }
  }

  // получение токена для пользователя
  async login(user: IUser) {
    try {
      const payload = {
        username: user.name,
        email: user.email,
        id: user.id,
        sub: String(user.id),
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new Error(`login: invalid request ~ ${e}`);
    }
  }

  async registration(newUser: ICreateUserDTO) {
    try {
      const user = await this.userService.createUser(newUser);
      const token = await this.login(user);
      await this.mailService.sendConfirmNotification(token.token, user.email);
      await this.notificationService.createNotification(
        'Поздравляем с регистрацией',
        user.id,
      );
    } catch (e) {
      throw new Error(`registration: invalid request ~ ${e}`);
    }
  }
}
