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
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AddressDto, UserGender } from '../dtos/user.dto';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 25 })
  firstName: string;

  @Column({ type: 'varchar', length: 25 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ type: 'jsonb' })
  address: AddressDto;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    primary: true,
    cascade: true,
  })
  @JoinTable()
  roles: RoleEntity[];

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  async validatePassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}
