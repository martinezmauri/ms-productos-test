import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  IsNumber,
  IsInt,
  Min,
  Matches,
} from 'class-validator';

export class CompleteProductVariantDto {
  @ApiProperty({
    description: 'Nombre descriptivo de la variante (ej. “Pequeño”, “Large”)',
    example: 'Grande',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Matches(/^[A-Za-z0-9 \-]+$/, {
    message: 'Solo se permiten letras, números, espacios y guiones.',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción breve de la variante',
    example: 'Versión grande del producto con empaque premium.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Precio específico de la variante',
    example: 1599.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Stock disponible de esta variante',
    example: 30,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description:
      'Código alfanumérico para identificar, localizar y hacer seguimiento interno de una variante.',
    example: 'AB123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'El SKU debe ser alfanumérico sin caracteres especiales.',
  })
  sku: string;

  @ApiProperty({
    description: 'Identificador único de la categoría a la que pertenece.',
    example: '4a1e2b60-1b2e-4aaf-a1f2-0e2c2e324ff6',
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'Identificador único de la subcategoría a la que pertenece.',
    example: 'b7cf2b80-9b2a-4f41-92be-f7c9b6ecff20',
  })
  @IsUUID()
  subcategoryId: string;

  @ApiProperty({
    description: 'Identificador único del producto al que pertenece.',
    example: 'd6e4a8fc-90a7-4db2-baad-0db278d38fc3',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'Identificador único del atributo al que está relacionado.',
    example: 'e0b31754-bc88-4ef1-bf98-12f9fa9238cc',
  })
  @IsUUID()
  attributeId: string;

  @ApiProperty({
    description: 'Identificador único de la empresa a la que pertenece.',
    example: 'a1b2c3d4-e5f6-7890-ab12-34567890abcd',
  })
  @IsUUID()
  companyId: string;
}
