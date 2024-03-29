import { getUniqueViolationKey } from 'src/utils/database.utils';
import { PostgresErrorCode } from './../database/postgres-error-code.enum';
import { ProductDto } from './dtos/product.dto';
import { PaginatedQueryDto } from './../dtos/base.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async find(query: PaginatedQueryDto) {
    const { limit, page } = query;
    const queryBuilder = this.repository.createQueryBuilder();
    const [data, total] = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getManyAndCount();
    return {
      data,
      total,
      query,
    };
  }

  async findById(id: number) {
    const product = await this.repository.findOne({ id });
    if (product) return product;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Product with id ${id} not found`,
    });
  }

  async createProducts(products: ProductDto[]) {
    const entities = this.repository.create(products);
    try {
      return await this.repository.save(entities);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION) {
        const value = getUniqueViolationKey(error?.detail as string);
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `product ${value} is taken`,
        });
      }
      if (error?.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: error?.detail,
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  async deleteProduct(id: number) {
    const result = await this.repository.delete({ id });
    if (result.affected !== 0) return result;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Product with id ${id} not found`,
    });
  }
}
