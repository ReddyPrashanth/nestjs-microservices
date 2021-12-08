import { RpcExceptionResponseDto, PaginatedQueryDto } from './../dtos/base.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto, AuthCredentialsDto } from './dtos/user.dto';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { catchError } from 'rxjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  createUser(dto: UserDto) {
    return this.client.send({ cmd: 'create_user' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  async authenticateUser(credentials: AuthCredentialsDto) {
    return {
      id: 1,
      email: credentials.email,
      lastName: 'psreepathi',
      firstName: 'prashanth',
    };
  }

  findById(id: number) {
    return this.client.send<UserEntity>({ cmd: 'find_user' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  find(queryDto: PaginatedQueryDto) {
    return this.client.send<UserEntity>({ cmd: 'find_users' }, queryDto);
  }
}
