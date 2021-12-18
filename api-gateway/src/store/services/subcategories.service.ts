import { SubCategory, SubCategoryDto } from '../dtos/subcategory.dto';
import { RpcExceptionResponseDto } from '../../dtos/base.dto';
import { catchError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class SubCategoriesService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientProxy) {}

  find() {
    return this.client.send({ cmd: 'find_sub_categories' }, {});
  }

  findById(id: number) {
    return this.client.send({ cmd: 'find_sub_category' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  findByCategory(categoryId: number) {
    return this.client.send(
      { cmd: 'find_sub_categories_by_category' },
      categoryId,
    );
  }

  createSubCategory(dto: SubCategoryDto) {
    return this.client.send({ cmd: 'create_sub_category' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  createSubCategories(subCategoriesDto: SubCategoryDto[]) {
    return this.client
      .send({ cmd: 'create_sub_categories' }, subCategoriesDto)
      .pipe(
        catchError((err: RpcExceptionResponseDto) => {
          throw new HttpException(err.message, err.status);
        }),
      );
  }

  updateSubCategory(id: number, dto: SubCategory) {
    return this.client
      .send({ cmd: 'update_sub_category' }, { id, ...dto })
      .pipe(
        catchError((err: RpcExceptionResponseDto) => {
          throw new HttpException(err.message, err.status);
        }),
      );
  }

  deleteSubCategory(id: number) {
    return this.client.send({ cmd: 'delete_sub_category' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }
}
