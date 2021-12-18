import { MailService } from './mail.service';
import { Body, Controller, Post } from '@nestjs/common';
import UserDto from './dtos/user.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly service: MailService) {}

  @Post('user')
  sendUserMail(@Body() user: UserDto) {
    return this.service.sendUserMail(user);
  }
}
