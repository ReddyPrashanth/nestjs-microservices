import { RpcException } from '@nestjs/microservices';
import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { RoleEntity, RolePermissionEntity } from './entities/role.entity';
import { RoleDto } from './dtos/role.dto';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async createUserRole(roleDto: RoleDto) {
    const role = this.repository.create(roleDto);
    try {
      return await role.save();
    } catch (error) {
      const { name } = roleDto;
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `Role ${name} is taken`,
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Something went wrong. Failed to create role ${name}`,
      });
    }
  }

  async findById(id: number) {
    const role = await this.repository.findOne(id);
    if (role) return role;
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Role with id ${id} not found`,
    });
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

  async attachPermissions(roleId: number, permissionIds: number[]) {
    const entities = permissionIds.map((pid) => {
      return {
        rolesId: roleId,
        permissionsId: pid,
      };
    });
    try {
      const { identifiers } = await this.rolePermissionRepository
        .createQueryBuilder()
        .insert()
        .into(RolePermissionEntity)
        .values(entities)
        .orIgnore()
        .execute();
      return identifiers;
    } catch (error) {
      console.log(error);
      if (error?.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: error?.detail,
        });
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong. Failed to attach permissions',
      });
    }
  }
}
