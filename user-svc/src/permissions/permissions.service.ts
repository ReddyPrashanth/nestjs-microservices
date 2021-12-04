import { RolePermissionEntity } from './../roles/entities/role.entity';
import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';
import { PermissionDto } from './dtos/permission.dto';
import { Repository } from 'typeorm';
import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PermissionEntity } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  async createUserPermission(permissionDto: PermissionDto) {
    const permission = this.repository.create(permissionDto);
    try {
      return await permission.save();
    } catch (error) {
      const { name } = permissionDto;
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new BadRequestException(`Permission ${name} is taken.`);
      throw new HttpException(
        `Something went wrong. Failed to create permission ${name}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number) {
    const permission = await this.repository.findOne(id);
    if (permission) return permission;
    throw new NotFoundException(`Permission with id ${id} not found`);
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

  async attachablePermissionsForARole(roleId: number) {
    const data = await this.repository
      .createQueryBuilder('permission')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('rpp."permissionsId"')
          .from(RolePermissionEntity, 'rpp')
          .where('rpp."rolesId" = :rolesId')
          .getQuery();
        return 'permission.id NOT IN' + subQuery;
      })
      .setParameter('rolesId', roleId)
      .getMany();
    return data;
  }
}
