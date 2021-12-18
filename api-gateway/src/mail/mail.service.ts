import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import UserDto from './dtos/user.dto';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_QUEUE_SERVICE')
    private mailClient: ClientProxy,
  ) {}
  sendUserMail(user: UserDto) {
    this.mailClient.emit({ cmd: 'new_user' }, user);
    return user;
  }
}
