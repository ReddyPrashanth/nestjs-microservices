import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { UsersService } from './users.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

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
