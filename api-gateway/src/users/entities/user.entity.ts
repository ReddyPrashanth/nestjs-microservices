export class UserEntity {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  // @Column({
  //   type: 'enum',
  //   enum: UserGender,
  //   default: UserGender.MALE,
  // })
  // gender: UserGender;

  // @Column()
  // @Exclude()
  // password: string;

  // @Column()
  // @Exclude()
  // salt: string;

  // @Column({ type: 'jsonb' })
  // address: AddressDto;

  // @ManyToMany(() => RoleEntity, (role) => role.users, {
  //   primary: true,
  //   cascade: true,
  //   eager: true,
  // })
  // @JoinTable()
  // roles: RoleEntity[];

  // @CreateDateColumn({ select: false })
  // createdAt: string;

  // @UpdateDateColumn({ select: false })
  // updatedAt: string;
}
