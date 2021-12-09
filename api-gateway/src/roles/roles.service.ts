import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './dtos/role.dto';
import { PaginatedQueryDto } from 'src/dtos/base.dto';
import { RpcExceptionResponseDto } from './../dtos/base.dto';
import { catchError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  find(queryDto: PaginatedQueryDto) {
    return this.client.send<RoleEntity[]>({ cmd: 'find_roles' }, queryDto);
  }

  findById(id: number) {
    return this.client.send<RoleEntity>({ cmd: 'find_role' }, id).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  createRole(dto: RoleDto) {
    return this.client.send<RoleEntity>({ cmd: 'create_role' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  attachPermissions(id: number, permissions: number[]) {
    return this.client
      .send({ cmd: 'attach_permissions' }, { id, permissions })
      .pipe(
        catchError((err: RpcExceptionResponseDto) => {
          throw new HttpException(err.message, err.status);
        }),
      );
  }
}
