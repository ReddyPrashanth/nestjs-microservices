import RolesPermission from './roles-permission.enum';
import UsersPermission from './users-permission.enum';

const Permission = {
  ...UsersPermission,
  ...RolesPermission,
};

type Permission = UsersPermission | RolesPermission;

export default Permission;
