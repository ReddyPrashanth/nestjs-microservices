import { RpcException } from '@nestjs/microservices';
import { UserDto, AuthCredentialsDto, UploadProfileDto } from './dtos/user.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityRepository } from './repositories/user.repository';
import { PaginatedQueryDto } from 'src/dtos/base.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntityRepository)
    private readonly repository: UserEntityRepository,
  ) {}

  async createUser(user: UserDto) {
    const { id, email } = await this.repository.createUser(user);
    return {
      id,
      email,
    };
  }

  async authenticateUser(credentials: AuthCredentialsDto) {
    return await this.repository.authenticateUser(credentials);
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

  async findById(id: number) {
    const user = await this.repository.findOne(id);
    if (user) {
      return user;
    }
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `User with id ${id} not found`,
    });
  }

  async uploadProfile(dto: UploadProfileDto) {
    return await this.repository.update({ id: dto.id }, dto);
  }
}
