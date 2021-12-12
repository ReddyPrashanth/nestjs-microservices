import { AuthModule } from './auth/auth.module';
import * as joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { FilesModule } from './files/files.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        APP_PORT: joi.number().required(),
        RABBIT_URL: joi.string().required(),
        USER_SERVICE_HOST: joi.string().required(),
        USER_SERVICE_PORT: joi.string().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRATION_TIME: joi.string().required(),
        AWS_REGION: joi.string().required(),
        S3_BUCKET_NAME: joi.string().required(),
      }),
    }),
    MailModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    FilesModule,
    StoreModule,
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
