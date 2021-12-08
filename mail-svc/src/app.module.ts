import { MailService } from './mail.service';
import * as joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        MAIL_HOST: joi.string().required(),
        MAIL_PORT: joi.number().required(),
        MAIL_USER: joi.string().required(),
        MAIL_PASS: joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
