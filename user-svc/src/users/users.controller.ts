import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async signUp(@Body() user: UserDto) {
    return await this.service.signUp(user);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findById(id);
  }
}
