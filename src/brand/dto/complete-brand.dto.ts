import { ApiProperty } from '@nestjs/swagger';

export class CompleteBrandDto {
  @ApiProperty({
    description: 'Código único de la marca',
    example: 'NIKE',
  })
  brandName: string;

  @ApiProperty({
    description: 'Estado activo de la marca',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-01-15T10:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-15T10:30:00.000Z',
  })
  updated_at: Date;
}
