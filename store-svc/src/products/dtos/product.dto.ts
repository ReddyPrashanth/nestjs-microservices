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

export class UpdateProductDto {
  id: number;

  product: ProductDto;
}

export class AttachSizesDto {
  productId: number;

  sizesId: number[];
}
