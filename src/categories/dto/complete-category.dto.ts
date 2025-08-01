import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  Length,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class CompleteCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 50, {
    message: 'El nombre debe tener entre 3 y 50 caracteres.',
  })
  @Matches(/^[A-Za-z0-9 \-]+$/, {
    message: 'El nombre solo permite letras, números, espacios y guiones.',
  })
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Ropa',
  })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Ropa casual de hombre y mujer',
    required: false,
  })
  description: string;

  @IsNotEmpty({ message: 'El SKU de la categoría es obligatorio.' })
  @IsString({ message: 'El SKU de la categoría debe ser una cadena de texto.' })
  @Length(2, 5, {
    message: 'El SKU debe tener entre 2 y 5 caracteres.',
  })
  @Matches(/^[A-Z0-9\-]+$/, {
    message: 'El SKU solo puede contener letras mayúsculas, números y guiones.',
  })
  @ApiProperty({
    description: 'SKU, código de referencia de la categoría',
    example: 'AD-MC',
  })
  sku: string;

  @ApiProperty({
    description:
      'Indica si la categoría está activa o bloqueada. Verdadero o Falso.',
    type: Boolean,
    default: true,
  })
  @IsBoolean({ message: 'El estado debe ser un valor booleano.' })
  status: boolean;

  @ApiProperty({
    description: 'Fecha de creación de la categoría',
    example: '2024-01-15T10:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización de la categoría',
    example: '2024-01-15T10:30:00.000Z',
  })
  updated_at: Date;
}
