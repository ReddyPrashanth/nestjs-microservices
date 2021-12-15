import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class SubCategory {
  @Length(3, 20)
  name: string;

  @IsString()
  description: string;
}

export class SubCategoryDto extends SubCategory {
  @IsInt()
  categoryId: number;
}

export class SubCategoriesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subCategories: SubCategory[];
}
