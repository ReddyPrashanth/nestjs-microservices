import {
  CreateProductsDto,
  AttachSizesDto,
  UpdateProductDto,
} from './dtos/product.dto';
import { PaginatedQueryDto } from './../dtos/base.dto';
import { ProductsService } from './products.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @MessagePattern({ cmd: 'find_products' })
  async find(@Payload() query: PaginatedQueryDto) {
    return await this.service.find(query);
  }

  @MessagePattern({ cmd: 'find_product' })
  async findById(id: number) {
    return await this.service.findById(id);
  }

  @MessagePattern({ cmd: 'create_products' })
  async createProducts(@Payload() dto: CreateProductsDto) {
    return await this.service.createProducts(dto.products);
  }

  @MessagePattern({ cmd: 'update_product' })
  async updateProduct(@Payload() dto: UpdateProductDto) {
    return await this.service.updateproduct(dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async delete(@Payload() id: number) {
    return await this.service.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'attach_sizes' })
  async attachSizes(@Payload() dto: AttachSizesDto) {
    return await this.service.attachSizes(dto.productId, dto.sizesId);
  }
}
