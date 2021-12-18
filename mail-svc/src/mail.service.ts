import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Email from 'email-templates';

@Injectable()
export class MailService {
  private readonly email: Email;

  constructor(private readonly configService: ConfigService) {
    const transport = createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASS'),
      },
    });
    this.email = new Email({
      message: {
        from: 'testing@example.com',
      },
      transport,
      send: true,
      preview: false,
    });
  }

  async sendMail(options: Email.EmailOptions) {
    return await this.email.send(options);
  }
}
