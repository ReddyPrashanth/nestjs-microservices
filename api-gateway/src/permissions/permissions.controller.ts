import { PermissionDto } from './dtos/permission.dto';
import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { PaginatedQueryDto } from 'src/dtos/base.dto';
import { PermissionsService } from './permissions.service';
import {
  Body,
  Controller,
  Get,
  UseInterceptors,
  Query,
  Param,
  Post,
} from '@nestjs/common';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  find(@Query() queryDto: PaginatedQueryDto) {
    return this.service.find(queryDto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post()
  createPermission(@Body() dto: PermissionDto) {
    return this.service.create(dto);
  }

  @Get('/role/:id')
  getAttachablePermissions(@Param('id') id: number) {
    return this.service.attachablePermissions(id);
  }
}
