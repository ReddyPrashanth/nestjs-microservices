import { HttpExceptionFilter } from './http-exception.filter';
import * as joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: joi.object({
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.string().required(),
        POSTGRES_USER: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        POSTGRES_DB: joi.string().required(),
        APP_PORT: joi.number(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
