import { Module } from '@nestjs/common';
import { MailManagerService } from './mail-manager.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.yandex.ru',
        secure: true,
        auth: {
          user: 'satchi.neandrew@yandex.ru',
          pass: 'mfujbedjrmkcqgow',
        },
      },
      defaults: {
        from: '"No Reply" <satchi.neandrew@yandex.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailManagerService],
  providers: [MailManagerService],
})
export class MailManagerModule {}
