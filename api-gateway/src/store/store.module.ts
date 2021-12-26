import { ProductSizesController } from './controllers/productsizes.controller';
import { ProductSizeService } from './services/productsize.service';
import { ProductsController } from './controllers/products.controller';
import { productsService } from './services/products.service';
import { SubCategoriesService } from './services/subcategories.service';
import { SubCategoriesController } from './controllers/subcategories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [
    CategoriesController,
    SubCategoriesController,
    ProductsController,
    ProductSizesController,
  ],
  providers: [
    CategoriesService,
    SubCategoriesService,
    productsService,
    ProductSizeService,
    {
      provide: 'STORE_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('STORE_SERVICE_HOST'),
            port: configService.get('STORE_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class StoreModule {}
