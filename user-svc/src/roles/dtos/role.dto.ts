import { IsNumber, IsString, Length } from 'class-validator';

export class RoleDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  description: string;
}

export class RolePermissionDto {
  @IsNumber({}, { each: true })
  permissions: number[];
}
