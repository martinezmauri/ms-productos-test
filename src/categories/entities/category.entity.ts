import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { Attribute } from './../../attributes/entities/attribute.entity';
import { Product } from '../../products/entities/product.entity';
@Entity('categories')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  sku: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  // @OneToMany(() => Attribute, (attribute) => attribute.category)
  // attributes: Attribute[];
}
