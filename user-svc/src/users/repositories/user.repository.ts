import { RpcException } from '@nestjs/microservices';
import { AuthCredentialsDto, UserDto } from './../dtos/user.dto';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { HttpStatus } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  async createUser(user: UserDto): Promise<UserEntity> {
    const { password, email } = user;
    const entity = this.create(user);
    entity.salt = await bcrypt.genSalt();
    entity.password = await this.hashPassword(password, entity.salt);
    try {
      return await entity.save();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `Email ${email} is taken`,
        });
      }
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }

  async authenticateUser(authCredentials: AuthCredentialsDto) {
    const { email, password } = authCredentials;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) return user;
    throw new RpcException({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Incorrect user credentials',
    });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
