import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class RoleEntity {
  id: number;

  name: string;

  description: string;

  createdAt: string;

  users: UserEntity[];

  permissions: PermissionEntity[];
}

export class RolePermissionEntity {
  rolesId: number;

  permissionsId: number;
}
