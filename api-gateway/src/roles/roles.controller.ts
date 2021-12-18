import { PaginatedQueryDto } from 'src/dtos/base.dto';
import { RolesService } from './roles.service';
import { RoleDto, RolePermissionDto } from './dtos/role.dto';
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

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  create(@Body() dto: RoleDto) {
    return this.service.createRole(dto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  find(@Query() queryDto: PaginatedQueryDto) {
    return this.service.find(queryDto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post('/:id/permissions')
  attachPermissions(
    @Param('id') id: number,
    @Body() rolePermissions: RolePermissionDto,
  ) {
    return this.service.attachPermissions(id, rolePermissions.permissions);
  }
}
