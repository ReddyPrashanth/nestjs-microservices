import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  signUp(@Body() user: UserDto) {
    return user;
  }
}
