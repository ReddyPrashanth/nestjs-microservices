import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

@Module({
  imports: [ConfigModule],
  controllers: [MonitoringController],
  providers: [
    MonitoringService,
    {
      provide: 'MONITORING_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('MONITORING_SERVICE_HOST'),
            port: configService.get('MONITORING_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class MonitoringModule {}
