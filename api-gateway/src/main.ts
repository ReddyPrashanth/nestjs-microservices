import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config, SharedIniFileCredentials } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://127.0.0.1:8080',
    credentials: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  config.region = configService.get('AWS_REGION', 'us-east-2');
  config.credentials = new SharedIniFileCredentials({ profile: 'default' });
  const port = configService.get('APP_PORT', 3001);
  await app.listen(port);
}
bootstrap();
