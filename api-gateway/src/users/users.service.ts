import { FilesService } from './../files/files.service';
import { RpcExceptionResponseDto, PaginatedQueryDto } from './../dtos/base.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto, AuthCredentialsDto } from './dtos/user.dto';
import {
  Inject,
  Injectable,
  HttpException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
    private readonly filesService: FilesService,
  ) {}

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
        throw new UnauthorizedException(err.message);
      }),
    );
  }

  find(queryDto: PaginatedQueryDto) {
    return this.client.send<UserEntity>({ cmd: 'find_users' }, queryDto);
  }

  async uploadProfile(dataBuffer: Buffer, user: UserEntity) {
    const { Key, Location } = await this.filesService.uploadUserProfile(
      dataBuffer,
    );
    const data = {
      id: user.id,
      avatarLocation: Location,
      avatarKey: Key,
    };
    const profile$ = this.client.send({ cmd: 'upload_profile' }, data);
    const profile = await firstValueFrom(profile$);
    if (profile.affected)
      return { location: Location, key: Key, userId: user.id };
    throw new HttpException(`User ${user.id} not found`, HttpStatus.NOT_FOUND);
  }

  getProfile(key: string) {
    if (key) {
      return this.filesService.getProfilePicture(key);
    }
    throw new HttpException(`Profile picture not found`, HttpStatus.NOT_FOUND);
  }
}
