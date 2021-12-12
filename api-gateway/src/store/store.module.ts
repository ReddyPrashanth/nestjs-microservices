import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'STORE_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('STORE_SERVICE_HOST'),
            port: configService.get('STORE_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class StoreModule {}
