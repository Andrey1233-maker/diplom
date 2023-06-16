import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailManagerModule } from 'src/mail-manager/mail-manager.module';
import { UserModule } from 'src/types/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { NotificationModule } from 'src/types/notification/notification.module';

@Module({
  imports: [
    UserModule,
    HttpModule,
    PassportModule,
    MailManagerModule,
    NotificationModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
