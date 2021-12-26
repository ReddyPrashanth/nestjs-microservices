import { SizeEntity } from './../../productsizes/entities/productsize.entity';
import { SubCategoryEntity } from './../../subcategories/entities/subcategory.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
@Unique(['name'])
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int' })
  subCategoryId: number;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updateAt: string;

  @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.products, {
    onDelete: 'CASCADE',
    eager: true,
  })
  subCategory: SubCategoryEntity;

  @ManyToMany(() => SizeEntity, { eager: true })
  @JoinTable()
  sizes: SizeEntity[];
}

@Entity({ name: 'products_sizes_sizes' })
export class ProductSizeEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  productsId: number;

  @PrimaryColumn({ type: 'int' })
  sizesId: number;
}
