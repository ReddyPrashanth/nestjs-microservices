import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './dtos/role.dto';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async createUserRole(roleDto: RoleDto) {
    const role = this.repository.create(roleDto);
    try {
      return await role.save();
    } catch (error) {
      const { name } = roleDto;
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new BadRequestException(`Role ${name} is taken`);
      throw new HttpException(
        `Something went wrong. Failed to create role ${name}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number) {
    const role = await this.repository.findOne(id);
    if (role) return role;
    throw new NotFoundException(`Role with id ${id} not found`);
  }

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
}
