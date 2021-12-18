import { DatabaseModule } from './database/database.module';
import * as joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulingModule } from './scheduling/scheduling.module';
import { AppService } from './app.service';

@Module({
  imports: [
    HealthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: joi.object({
        APP_PORT: joi.number().required(),
        RMQ_URL: joi.string().required(),
        API_GATEWAY_URL: joi.string().required(),
        USER_SVC_URL: joi.string().required(),
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.number().required(),
        POSTGRES_USER: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        POSTGRES_DB: joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    SchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
