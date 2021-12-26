import { Length } from 'class-validator';

export class ProductSizeDto {
  @Length(1, 6)
  name: string;

  @Length(0, 100)
  description: string;
}
