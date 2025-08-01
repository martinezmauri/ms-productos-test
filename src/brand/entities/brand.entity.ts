import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { IsString, IsBoolean, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@Entity('brand')
export class Brand {
  @ApiProperty({
    description: 'ID único de la marca',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Código/descripcion única de la marca',
    example: 'NIKE',
    minLength: 4,
    maxLength: 50,
  })
  @Column({ length: 50, unique: true })
  @IsString()
  @Length(4, 50)
  brandName: string;

  @ApiProperty({
    description: 'Estado activo de la marca',
    example: true,
    default: true,
  })
  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

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

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
