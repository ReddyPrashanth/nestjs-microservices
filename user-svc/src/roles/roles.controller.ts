import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleDto, AttachPermissionsDto } from './dtos/role.dto';
import { RolesService } from './roles.service';
import { Controller } from '@nestjs/common';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'create_role' })
  async createUserRole(@Payload() roleDto: RoleDto) {
    return await this.rolesService.createUserRole(roleDto);
  }

  @MessagePattern({ cmd: 'find_role' })
  async findById(@Payload() id: number) {
    return await this.rolesService.findById(id);
  }

  @MessagePattern({ cmd: 'find_roles' })
  async find(@Payload() query: PaginatedQueryDto) {
    return await this.rolesService.find(query);
  }

  @MessagePattern({ cmd: 'attach_permissions' })
  async attachPermissions(@Payload() dto: AttachPermissionsDto) {
    return await this.rolesService.attachPermissions(dto.id, dto.permissions);
  }
}
