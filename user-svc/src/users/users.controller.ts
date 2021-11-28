import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { UsersService } from './users.service';
import { PaginatedQueryDto } from './dtos/user.dto';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

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
