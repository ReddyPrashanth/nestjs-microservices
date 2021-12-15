export class ProductDto {
  name: string;

  description: string;

  price: number;

  stock: number;

  subCategoryId: number;
}

export class CreateProductsDto {
  products: ProductDto[];
}
