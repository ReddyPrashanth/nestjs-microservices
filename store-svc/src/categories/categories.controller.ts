import { CategoryDto } from './dtos/category.dto';
import { CategoriesService } from './categories.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @MessagePattern({ cmd: 'find_categories' })
  async find() {
    const data = await this.service.find();
    return { data };
  }

  @MessagePattern({ cmd: 'find_category' })
  async findById(id: number) {
    return await this.service.findById(id);
  }

  @MessagePattern({ cmd: 'create_category' })
  async create(dto: CategoryDto) {
    return this.service.createCategory(dto);
  }

  @MessagePattern({ cmd: 'update_category' })
  async update(dto: CategoryDto) {
    return this.service.updateCategory(dto);
  }

  @MessagePattern({ cmd: 'delete_category' })
  async delete(id: number) {
    return this.service.deleteCategory(id);
  }
}
