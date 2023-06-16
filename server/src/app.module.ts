import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dbConfig } from './dbConfig';
import { UserModule } from './types/user/user.module';
import { MailManagerService } from './mail-manager/mail-manager.service';
import { MailManagerModule } from './mail-manager/mail-manager.module';
import { NotificationModule } from './types/notification/notification.module';
import { TableModule } from './types/table/table.module';
import { CurrencyModule } from './types/currency/currency.module';
import { TransferModule } from './types/transfer/transfer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    AuthModule,
    MailManagerModule,
    NotificationModule,
    TableModule,
    CurrencyModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
