import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Attribute } from './attribute.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

@Entity('attributeType')
export class AttributeType {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @Length(5, 50)
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  sku: string;

  @OneToMany(() => Attribute, (attribute) => attribute.attributeType, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  attributes: Attribute[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.attributeType, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subcategories: Subcategory[];

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

  @IsNotEmpty({
    message: 'De-activation of an attributeType.',
  })
  @ApiProperty({
    description: 'De-activation of an attributeType. True or False.',
    example: 'true',
  })
  @IsBoolean({
    message: 'To unactivate/activate an attributeTyp',
  })
  status: boolean;
}
