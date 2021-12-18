import { IsString, Length } from 'class-validator';

export class CategoryDto {
  @Length(3, 20)
  name: string;

  @IsString()
  description: string;
}
