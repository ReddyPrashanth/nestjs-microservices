import { RpcExceptionResponseDto, PaginatedQueryDto } from './../dtos/base.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto, AuthCredentialsDto } from './dtos/user.dto';
import {
  Inject,
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
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

  authenticateUser(credentials: AuthCredentialsDto) {
    return this.client.send<UserEntity>({ cmd: 'sign_in' }, credentials).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  findById(id: number) {
    return this.client.send<UserEntity>({ cmd: 'find_user' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      }),
    );
  }

  find(queryDto: PaginatedQueryDto) {
    return this.client.send<UserEntity>({ cmd: 'find_users' }, queryDto);
  }
}
