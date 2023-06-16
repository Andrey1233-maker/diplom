import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbConfig } from './dbConfig';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  console.log(dbConfig);

  const app = await NestFactory.create(AppModule);
  const globalPrefix = '';

  app.use(bodyParser.json({ limit: '50mb' }));
  app.enableCors();
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
    }),
  );
  app.setGlobalPrefix(globalPrefix);
  await app.listen(5000);
}
bootstrap();
