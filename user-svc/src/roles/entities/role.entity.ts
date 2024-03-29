import { PermissionEntity } from './../../permissions/entities/permission.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'roles' })
@Unique(['name'])
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    primary: true,
  })
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    primary: true,
    cascade: true,
    eager: true,
  })
  @JoinTable()
  permissions: PermissionEntity[];
}

@Entity('roles_permissions_permissions')
export class RolePermissionEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  rolesId: number;

  @PrimaryColumn({ type: 'int' })
  permissionsId: number;
}
