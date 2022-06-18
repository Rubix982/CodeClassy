import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: [
      process.env.ENV == 'DEV'
        ? 'http://localhost:3000'
        : 'http://frontend-service:3000',
      process.env.ENV == 'DEV'
        ? 'http://localhost:4000'
        : 'http://editor-service:4000',
    ],
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
