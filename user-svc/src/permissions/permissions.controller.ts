import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionDto } from './dtos/permission.dto';
import { PermissionsService } from './permissions.service';
import { Controller } from '@nestjs/common';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @MessagePattern({ cmd: 'create_permission' })
  createUserPermission(@Payload() permissionDto: PermissionDto) {
    return this.permissionService.createUserPermission(permissionDto);
  }

  @MessagePattern({ cmd: 'find_permission' })
  async findById(@Payload() id: number) {
    return await this.permissionService.findById(id);
  }

  @MessagePattern({ cmd: 'find_permissions' })
  // @UseInterceptors(TransformInterceptor)
  async find(@Payload() query: PaginatedQueryDto) {
    return await this.permissionService.find(query);
  }

  @MessagePattern({ cmd: 'role_permissions' })
  async getAttachablePermissions(@Payload() roleId: number) {
    return await this.permissionService.attachablePermissionsForARole(roleId);
  }
}
