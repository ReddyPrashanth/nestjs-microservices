import { CreateProductsDto, ProductDto } from './../dtos/product.dto';
import { catchError } from 'rxjs';
import {
  PaginatedQueryDto,
  RpcExceptionResponseDto,
} from './../../dtos/base.dto';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class productsService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientProxy) {}

  find(queryDto: PaginatedQueryDto) {
    return this.client.send({ cmd: 'find_products' }, queryDto);
  }

  findById(id: number) {
    return this.client.send({ cmd: 'find_product' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  createProducts(dto: CreateProductsDto) {
    return this.client.send({ cmd: 'create_products' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  updateProduct(id: number, dto: ProductDto) {
    return this.client
      .send({ cmd: 'update_product' }, { id, product: dto })
      .pipe(
        catchError((err: RpcExceptionResponseDto) => {
          throw new HttpException(err.message, err.status);
        }),
      );
  }

  deleteProduct(id: number) {
    return this.client.send({ cmd: 'delete_product' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }
}
