import { SubCategoryDto } from './dtos/subcategory.dto';
import { SubcategoriesService } from './subcategories.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly service: SubcategoriesService) {}

  @MessagePattern({ cmd: 'find_sub_categories' })
  async find() {
    return await this.service.find();
  }

  @MessagePattern({ cmd: 'find_sub_category' })
  async findById(@Payload() id: number) {
    return await this.service.findById(id);
  }

  @MessagePattern({ cmd: 'create_sub_category' })
  async creatCategory(@Payload() dto: SubCategoryDto) {
    return await this.service.createSubCategory(dto);
  }

  @MessagePattern({ cmd: 'create_sub_categories' })
  async createCategories(@Payload() subCategoriesDto: SubCategoryDto[]) {
    return await this.service.createSubCategories(subCategoriesDto);
  }

  @MessagePattern({ cmd: 'update_sub_category' })
  async updateSubCategory(@Payload() dto: SubCategoryDto) {
    return await this.service.updateSubCategory(dto);
  }

  @MessagePattern({ cmd: 'delete_sub_category' })
  async deleteSubcategory(@Payload() id: number) {
    return await this.service.deleteSubCategory(id);
  }
}
