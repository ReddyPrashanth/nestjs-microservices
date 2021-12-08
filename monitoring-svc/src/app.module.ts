import * as joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      validationSchema: joi.object({
        APP_PORT: joi.number().required(),
        RMQ_URL: joi.string().required(),
        API_GATEWAY_URL: joi.string().required(),
        USER_SVC_URL: joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
