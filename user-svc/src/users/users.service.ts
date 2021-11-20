import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserDto } from './dtos/user.dto';
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
    return await this.repository.createUser(user);
  }

  async findById(id: number) {
    const user = await this.repository.findOne(id);
    if (user) {
      return user;
    }
    throw new UserNotFoundException(id);
  }
}
