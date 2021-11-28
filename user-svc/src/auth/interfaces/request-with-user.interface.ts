import { UserEntity } from './../../users/entities/user.entity';
import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: UserEntity;
}
