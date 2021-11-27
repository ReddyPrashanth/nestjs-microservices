import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserDto, PaginatedQueryDto } from './dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntityRepository)
    private readonly repository: UserEntityRepository,
  ) {}

  async signUp(user: UserDto) {
    const { id, email } = await this.repository.createUser(user);
    return {
      id,
      email,
    };
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
    throw new UserNotFoundException(id);
  }
}
