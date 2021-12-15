import { CreateProductsDto } from './../dtos/product.dto';
import { TransformInterceptor } from './../../interceptors/transform.interceptor';
import { PaginatedQueryDto } from './../../dtos/base.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { productsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: productsService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  find(@Query() queryDto: PaginatedQueryDto) {
    return this.service.find(queryDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  createProducts(@Body() dto: CreateProductsDto) {
    return this.service.createProducts(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteProduct(id);
  }
}
