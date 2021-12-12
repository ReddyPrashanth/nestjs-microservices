import { PostgresErrorCode } from './../database/postgres-error-code.enum';
import { CategoryDto } from './dtos/category.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async find() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const category = await this.repository.findOne({ id });
    if (category) {
      return category;
    }
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Category with id ${id} not found`,
    });
  }

  async createCategory(dto: CategoryDto) {
    const category = this.repository.create(dto);
    try {
      return await category.save();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `Category name ${dto.name} is already taken`,
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  async updateCategory(dto: CategoryDto) {
    const entity = this.repository.create(dto);
    const result = await this.repository.update(dto.id, entity);
    if (result.affected !== 0) return dto;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Category with id ${dto.id} not found`,
    });
  }

  async deleteCategory(id: number) {
    const result = await this.repository.delete({ id });
    if (result.affected !== 0) {
      return {
        message: `Category with id ${id} deleted`,
      };
    }
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Category with id ${id} not found`,
    });
  }
}
