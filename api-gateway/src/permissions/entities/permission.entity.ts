import { RoleEntity } from './../../roles/entities/role.entity';

export class PermissionEntity {
  id: number;

  name: string;

  description: string;

  createdAt: string;

  roles: RoleEntity[];
}
