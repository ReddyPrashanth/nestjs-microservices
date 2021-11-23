import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { UsersService } from './users.service';
import { UserDto, PaginatedQueryDto } from './dtos/user.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async signUp(@Body() user: UserDto) {
    return await this.service.signUp(user);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async find(@Query() query: PaginatedQueryDto) {
    return await this.service.find(query);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findById(id);
  }
}
