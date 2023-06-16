import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserDTO, IGoogleUserDTO } from './dto/user.dto';
import { IUser, User } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // создание пользователя в базе данных
  async createUser(newUser: ICreateUserDTO): Promise<IUser> {
    try {
      const user1 = await this.userRepository.findOneBy({
        email: newUser.email,
      });
      if (!user1) {
        const user = await this.userRepository.create(newUser);
        await this.userRepository.save(user);
        return user;
      }
      if (!user1.isConfirmed) {
        return user1;
      }

      throw new Error('user exist');
    } catch (e) {
      throw new Error(`createUser: ivalid request ~ ${e}`);
    }
  }

  // создает пользователя если его нет и возвращает, если сущесвует
  async findOrCreateGoogleUser(googleUser: IGoogleUserDTO) {
    try {
      const user = await this.getUserByEmail(googleUser.email);

      // елси пользователь найден, возвращем его
      if (user) {
        return user;
      }
      // иначе создаем нового и возвращаем
      const newUser = await this.createUser({
        name: googleUser.name,
        auth_key: null,
        isGoogleAuth: true,
        email: googleUser.email,
        picture: googleUser.picture,
        isConfirmed: true,
      });

      return newUser;
    } catch (e) {
      throw new Error(`findOrCreateUser: invalid request ¬ ${e}`);
    }
  }

  // ищет пользователя по почте или null
  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      console.log(user, email);
      return user
        ? {
            ...user,
            picture:
              user.picture ??
              'https://avatars.mds.yandex.net/i?id=377c6fd29f7af9828842ee2d0b942f2f825c7a04-5233852-images-thumbs&n=13',
          }
        : null;
    } catch (e) {
      throw new Error(`getUserByEmail: invalid request ¬ ${e}`);
    }
  }

  // пользователь по его id
  async getUserById(id: string): Promise<IUser> {
    try {
      console.log(id);
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (e) {
      throw new Error(`getUserById: invalid request ~ ${e}`);
    }
  }

  async setConfirm(id: string) {
    try {
      await this.userRepository.update({ id }, { isConfirmed: true });
    } catch (e) {
      throw new Error(`setConfirm: invalid request ~ ${e}`);
    }
  }
}
