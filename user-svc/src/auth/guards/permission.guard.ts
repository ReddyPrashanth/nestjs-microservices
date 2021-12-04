import { IRequestWithUser } from './../interfaces/request-with-user.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  CanActivate,
  Type,
  ExecutionContext,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import Permission from '../permissions/permission.type';

const PermissionsGuard = (...permissions: Permission[]): Type<CanActivate> => {
  class PermissionsGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<IRequestWithUser>();
      console.log(request.cookies);
      const { user } = request;
      let userPermissions = [];
      user.roles.forEach((role) => {
        userPermissions = [
          ...userPermissions,
          ...role.permissions.map((p) => p.name),
        ];
      });
      const isAuthorized = permissions.some((p) => userPermissions.includes(p));
      if (!isAuthorized)
        throw new UnauthorizedException(
          'User does not have sufficient permissions to access this resource',
        );
      return isAuthorized;
    }
  }
  return mixin(PermissionsGuardMixin);
};

export default PermissionsGuard;
