import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { AttributeType } from '../../attributes/entities/attributeType.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description?: string;

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];

  @Column({ type: 'uuid' })
  attributeTypeId: string;

  @ManyToOne(
    () => AttributeType,
    (attributeType) => attributeType.subcategories,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'attributeTypeId' })
  attributeType: AttributeType;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-01-15T10:30:00.000Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-15T10:30:00.000Z',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
