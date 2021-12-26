import { ProductSizeDto } from './dtos/productsize.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsizesService } from './productsizes.service';
import { Controller } from '@nestjs/common';

@Controller('productsizes')
export class ProductsizesController {
  constructor(private readonly service: ProductsizesService) {}

  @MessagePattern({ cmd: 'find_sizes' })
  async find() {
    const data = await this.service.find();
    return { data };
  }

  @MessagePattern({ cmd: 'create_size' })
  async create(@Payload() dto: ProductSizeDto) {
    return await this.service.create(dto);
  }

  @MessagePattern({ cmd: 'delete_size' })
  async delete(@Payload() id: number) {
    return await this.service.delete(id);
  }
}
