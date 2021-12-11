import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: 'http://127.0.0.1:8080',
    credentials: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('APP_PORT', 3002));
}
bootstrap();
