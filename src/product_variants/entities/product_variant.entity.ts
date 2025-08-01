import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Brand } from '../../brand/entities/brand.entity';

@Entity()
export class ProductVariants {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 5 })
  sku: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Attribute)
  @JoinColumn({ name: 'attributeId' })
  attribute: Attribute;
}
