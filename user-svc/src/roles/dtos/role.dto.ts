export class RoleDto {
  name: string;

  description: string;
}

export class RolePermissionDto {
  permissions: number[];
}

export class AttachPermissionsDto {
  id: number;

  permissions: number[];
}
