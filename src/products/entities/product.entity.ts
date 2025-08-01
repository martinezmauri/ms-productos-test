import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Brand } from '../../brand/entities/brand.entity';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceBase: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 12 })
  sku: string;

  @ManyToOne(() => Brand, { nullable: false, onDelete: 'CASCADE' })
  brand: Brand;

  @ManyToOne(() => Category, { nullable: false, onDelete: 'CASCADE' })
  category: Category;

  @ManyToOne(() => Subcategory, { nullable: false, onDelete: 'SET NULL' })
  subcategory: Subcategory;

  @Column({ type: 'uuid' })
  companyId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  availability?: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  images?: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
