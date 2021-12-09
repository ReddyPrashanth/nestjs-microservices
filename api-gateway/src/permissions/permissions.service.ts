import { PermissionDto } from './dtos/permission.dto';
import { RpcExceptionResponseDto } from './../dtos/base.dto';
import { catchError } from 'rxjs';
import { PaginatedQueryDto } from 'src/dtos/base.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Injectable, HttpException, Inject } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  find(queryDto: PaginatedQueryDto) {
    return this.client.send({ cmd: 'find_permissions' }, queryDto);
  }

  findById(id: number) {
    return this.client.send({ cmd: 'find_permission' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  create(dto: PermissionDto) {
    return this.client.send({ cmd: 'create_permission' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }
}
