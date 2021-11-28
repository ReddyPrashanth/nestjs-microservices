import { RoleEntity } from './../../roles/entities/role.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'permissions' })
@Unique(['name'])
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions, { primary: true })
  roles: RoleEntity[];
}
