import { PermissionDto } from './dtos/permission.dto';
import { PermissionsService } from './permissions.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post()
  createUserPermission(@Body() permissionDto: PermissionDto) {
    return this.permissionService.createUserPermission(permissionDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.permissionService.findById(id);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async find(@Query() query: PaginatedQueryDto) {
    return await this.permissionService.find(query);
  }

  @Get('role/:id')
  async getAttachablePermissions(@Param('id') roleId: number) {
    return await this.permissionService.attachablePermissionsForARole(roleId);
  }
}
