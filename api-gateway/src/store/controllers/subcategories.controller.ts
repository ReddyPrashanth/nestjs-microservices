import { SubCategory, SubCategoryDto } from './../dtos/subcategory.dto';
import { SubCategoriesService } from '../services/subcategories.service';
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

@Controller('subcategories')
export class SubCategoriesController {
  constructor(private readonly service: SubCategoriesService) {}

  @Get()
  find() {
    return this.service.find();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: SubCategoryDto) {
    return this.service.createSubCategory(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: SubCategory) {
    return this.service.updateSubCategory(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteSubCategory(id);
  }
}
