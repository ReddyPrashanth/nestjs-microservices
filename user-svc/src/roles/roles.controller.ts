import { RoleDto, RolePermissionDto } from './dtos/role.dto';
import { RolesService } from './roles.service';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createUserRole(@Body() roleDto: RoleDto) {
    return await this.rolesService.createUserRole(roleDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.rolesService.findById(id);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async find(@Query() query: PaginatedQueryDto) {
    return await this.rolesService.find(query);
  }

  @Post(':id/permissions')
  async attachPermissions(
    @Param('id') roleId: number,
    @Body() rolePermissionDto: RolePermissionDto,
  ) {
    return await this.rolesService.attachPermissions(
      roleId,
      rolePermissionDto.permissions,
    );
  }
}
