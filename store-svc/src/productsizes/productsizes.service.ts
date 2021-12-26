import { ProductSizeDto } from './dtos/productsize.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SizeEntity } from './entities/productsize.entity';
import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsizesService {
  constructor(
    @InjectRepository(SizeEntity)
    private readonly repository: Repository<SizeEntity>,
  ) {}

  async find() {
    return await this.repository.find();
  }

  async create(dto: ProductSizeDto) {
    const size = this.repository.create(dto);
    try {
      return await size.save();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `Size ${dto.name} already exists`,
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  async delete(id: number) {
    const result = await this.repository.delete({ id });
    if (result.affected != 0) return result;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Size with id ${id} not found`,
    });
  }
}
