import { ProductSizeDto } from './../dtos/productsize.dto';
import {
  Controller,
  Delete,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductSizeService } from '../services/productsize.service';

@Controller('productsizes')
export class ProductSizesController {
  constructor(private readonly service: ProductSizeService) {}

  @Get()
  find() {
    return this.service.find();
  }

  @Post()
  create(@Body() dto: ProductSizeDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
