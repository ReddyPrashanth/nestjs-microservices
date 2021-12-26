import { SizeEntity } from './entities/productsize.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsizesController } from './productsizes.controller';
import { ProductsizesService } from './productsizes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity])],
  controllers: [ProductsizesController],
  providers: [ProductsizesService],
  exports: [ProductsizesService],
})
export class ProductsizesModule {}
