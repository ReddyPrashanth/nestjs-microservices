import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_QUEUE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'mail_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
