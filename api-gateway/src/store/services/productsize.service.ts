import { RpcExceptionResponseDto } from './../../dtos/base.dto';
import { catchError } from 'rxjs';
import { ProductSizeDto } from './../dtos/productsize.dto';
import { Inject, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductSizeService {
  constructor(
    @Inject('STORE_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  find() {
    return this.client.send({ cmd: 'find_sizes' }, {});
  }

  create(dto: ProductSizeDto) {
    console.log(dto);
    return this.client.send({ cmd: 'create_size' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  delete(id: number) {
    return this.client.send({ cmd: 'delete_size' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }
}
