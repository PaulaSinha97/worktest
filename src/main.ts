import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // For FE to get this cookie we need to pass passthorugh and enable here cors
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true})
    app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )
  await app.listen(3000);
}
bootstrap();
