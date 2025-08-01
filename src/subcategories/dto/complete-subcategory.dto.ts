import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  Length,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsUUID,
} from 'class-validator';

export class CompleteSubcategoryDto {
  @IsNotEmpty({ message: 'SubCategory name is required' })
  @IsString({ message: 'Name must be a string.' })
  @Length(3, 50, {
    message: 'Name must be between 3 and 50 characters.',
  })
  @Matches(/^[A-Za-z0-9 \-]+$/, {
    message: 'This field only permits letters, numbers, spaces, and hyphens.',
  })
  @ApiProperty({
    description: 'SubCategory Name',
    example: 'Pantalon',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'SubCategory Description',
    example: 'Pantalon casual de hombre',
  })
  description: string;

  @IsNotEmpty({ message: 'SKU for the SubCategory is required' })
  @IsString({ message: 'SKU for the SubCategory must be a string.' })
  @Length(2, 5, {
    message: 'SKU must be between 2 and 5 characters.',
  })
  @Matches(/^[A-Z0-9\-]+$/, {
    message: 'SKU must contain only uppercase letters, numbers, and hyphens.',
  })
  @ApiProperty({
    description: 'SKU, stock keeping unit code ',
    example: 'AD-MC',
  })
  sku: string;

  @ApiProperty({
    description:
      'Indicates if the SubCategory is active or blocked. True or False.',
    type: Boolean,
    default: true,
  })
  @IsBoolean()
  status: boolean;

  @IsUUID()
  @IsNotEmpty({ message: 'Category ID is required' })
  @ApiProperty({
    description: 'ID of the category this product belongs to',
    example: 'd8737e33-4d0d-49eb-ad10-b2a1d3489666',
  })
  categoryId: string;
}
