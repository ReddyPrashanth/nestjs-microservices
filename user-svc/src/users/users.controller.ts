import { UserDto, AuthCredentialsDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { PaginatedQueryDto } from 'src/dtos/base.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @MessagePattern({ cmd: 'find_users' })
  async find(@Payload() query: PaginatedQueryDto) {
    return await this.service.find(query);
  }

  @MessagePattern({ cmd: 'find_user' })
  async findById(@Payload() id: number) {
    return await this.service.findById(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() user: UserDto) {
    return await this.service.createUser(user);
  }

  @MessagePattern({ cmd: 'sign_in' })
  async signIn(@Payload() credentials: AuthCredentialsDto) {
    return await this.service.authenticateUser(credentials);
  }
}
