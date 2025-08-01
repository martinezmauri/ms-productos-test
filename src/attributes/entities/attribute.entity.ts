import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  IsNull,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from './attributeType.entity';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

@Entity('attributes')
export class Attribute {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @Length(5, 50)
  name: string;

  @ApiProperty()
  @Column({ length: 5, nullable: true })
  @IsString()
  @Length(1, 5)
  sku: string;

  @ManyToOne(() => AttributeType, (attributeType) => attributeType.attributes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
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

  @IsNotEmpty({
    message: 'De-activation of an attribute.',
  })
  @ApiProperty({
    description: 'De-activation of an attribute. True or False.',
    example: 'true',
  })
  @IsBoolean({
    message: 'To unactivate/activate an attribute',
  })
  status: boolean;
}
