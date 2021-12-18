import { MailService } from './mail.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailService) {}

  async sendNewUserMail(user: UserDto) {
    const options = {
      template: join(__dirname, '..', 'templates', 'emails', 'users'),
      message: {
        to: user.email,
      },
      locals: {
        name: user.name,
      },
    };
    await this.mailService.sendMail(options);
  }
}
