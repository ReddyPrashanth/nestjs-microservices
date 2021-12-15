import { SubCategoriesService } from './subcategories.service';
import { SubCategoriesDto } from './../dtos/subcategory.dto';
import { CategoryDto } from './../dtos/category.dto';
import { RpcExceptionResponseDto } from './../../dtos/base.dto';
import { catchError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('STORE_SERVICE') private readonly client: ClientProxy,
    private readonly subCategoryService: SubCategoriesService,
  ) {}

  find() {
    return this.client.send({ cmd: 'find_categories' }, {});
  }

  findById(id: number) {
    return this.client.send({ cmd: 'find_category' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  findSubCategories(categoryId: number) {
    return this.subCategoryService.findByCategory(categoryId);
  }

  createCategory(dto: CategoryDto) {
    return this.client.send({ cmd: 'create_category' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  createSubCategories(id: number, dto: SubCategoriesDto) {
    const subCategories = dto.subCategories.map((sc) => {
      return { ...sc, categoryId: id };
    });
    return this.subCategoryService.createSubCategories(subCategories);
  }

  updateCategory(id: number, dto: CategoryDto) {
    return this.client.send({ cmd: 'update_category' }, { id, ...dto }).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  deleteCategory(id: number) {
    return this.client.send({ cmd: 'delete_category' }, id);
  }
}
