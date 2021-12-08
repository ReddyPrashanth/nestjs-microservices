import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { UsersService } from './users.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
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
  find(@Query() query: PaginatedQueryDto) {
    return this.service.find(query);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }
}