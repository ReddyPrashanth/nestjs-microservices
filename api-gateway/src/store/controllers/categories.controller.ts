import { SubCategoriesDto } from './../dtos/subcategory.dto';
import { CategoriesService } from './../services/categories.service';
import { CategoryDto } from './../dtos/category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  find() {
    return this.service.find();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CategoryDto) {
    return this.service.createCategory(dto);
  }

  @Get('/:id/subcategories')
  findSubCategories(@Param('id') id: number) {
    return this.service.findSubCategories(id);
  }

  @Post('/:id/subcategories')
  createSubCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SubCategoriesDto,
  ) {
    return this.service.createSubCategories(id, dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CategoryDto) {
    return this.service.updateCategory(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteCategory(id);
  }
}
