import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  ValidateNested,
  Length,
  IsNumber,
  IsInt,
} from 'class-validator';

export class ProductDto {
  @Length(3, 40)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;

  @IsInt()
  subCategoryId: number;
}

export class CreateProductsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
