import { IsString, Length } from 'class-validator';

export class PermissionDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  description: string;
}
