import { ProductEntity } from './../../products/entities/product.entity';
import { CategoryEntity } from './../../categories/entities/category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'subcategories' })
@Unique(['name'])
export class SubCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  categoryId: number;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.subCategory)
  products: ProductEntity[];
}
