import { IsString, Length } from 'class-validator';

export class ServiceDto {
  @Length(4, 25)
  name: string;

  @IsString()
  description: string;

  @Length(0, 100)
  url: string;
}
