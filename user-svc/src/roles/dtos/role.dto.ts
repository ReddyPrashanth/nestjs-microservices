import { IsString, Length } from 'class-validator';

export class RoleDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  description: string;
}
