import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsInt,
  IsUUID,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  Length,
  IsOptional,
  Min,
  Matches,
} from 'class-validator';

export class CompleteProductDto {
  @ApiProperty({ description: 'Nombre descriptivo del producto.', example: 'Producto' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'Descripción breve del producto.',
    required: false,
    example: 'Un producto de alta calidad para uso diario.'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Precio base del producto', example: 199.99 })
  @IsNumber()
  @Min(0)
  priceBase: number;

  @ApiProperty({ description: 'Stock general del producto.', example: 50 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description:
      'Código alfanumérico para identificar, localizar y hacer seguimiento interno de un producto.',
    example: 'SKU12345'
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 12)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'El SKU debe ser alfanumérico y sin caracteres especiales.',
  })
  sku: string;

  @ApiProperty({ description: 'Identificador de la categoría asignada.', example: 'c1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'Identificador de la subcategoría asignada.', example: 's1b2c3d4-e5f6-7890-abcd-1234567890cd' })
  @IsUUID()
  subcategoryId: string;

  @ApiProperty({ description: 'Identificador de la empresa propietaria.', example: 'e1f2g3h4-i5j6-7890-abcd-1234567890ef' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Horarios o días de disponibilidad (Ej: “Lun-Vie 9-18”)',
    required: false,
    example: 'Lun-Vie 9-18'
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  availability: string;

  @ApiProperty({
    description: 'Estado de producto: activo (true) o inactivo (false)',
    example: true
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'URLs o referencias de imágenes asociadas al producto',
    type: [String],
    example: ['https://ejemplo.com/imagen1.jpg', 'https://ejemplo.com/imagen2.jpg']
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({
    description: 'Fecha de creación del producto',
    example: '2024-01-15T10:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del producto',
    example: '2024-01-15T10:30:00.000Z',
  })
  updated_at: Date;
}
