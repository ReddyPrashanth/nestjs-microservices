import { PostgresErrorCode } from './../database/postgres-error-code.enum';
import { SubCategoryDto } from './dtos/subcategory.dto';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { SubCategoryEntity } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly repository: Repository<SubCategoryEntity>,
  ) {}

  async find() {
    return await this.repository.find();
  }

  async findById(id: number) {
    const subCategory = await this.repository.findOne({ id });
    if (subCategory) return subCategory;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Sub category with id ${id} not found`,
    });
  }

  async createSubCategory(dto: SubCategoryDto) {
    const subCategory = this.repository.create(dto);
    try {
      return await subCategory.save();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `Sub category ${dto.name} is already taken`,
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  async createSubCategories(subCategoriesDto: SubCategoryDto[]) {
    const subCategories = this.repository.create(subCategoriesDto);
    try {
      return await this.repository.save(subCategories);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Sub category is already taken',
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  async updateSubCategory(dto: SubCategoryDto) {
    const { id } = dto;
    const result = await this.repository.update(id, dto);
    if (result.affected !== 0) return dto;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Sub category with id ${id} not found`,
    });
  }

  async deleteSubCategory(id: number) {
    const result = await this.repository.delete({ id });
    if (result.affected !== 0)
      return { message: `Sub category with id ${id} deleted` };
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Sub category with id ${id} not found`,
    });
  }
}
