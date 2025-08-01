import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CompleteAttributeDto {
  @ApiProperty({ description: 'ID único del atributo', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nombre del atributo',
    example: 'Ropa Deportiva',
    minLength: 5,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Staff name is required' })
  @IsString({
    message:
      'The name is mandatory and  must have between 5 and 50 characteres',
  })
  @Length(5, 50, {
    message:
      'LThe name is mandatory and  must have between 5 and 50 characteres',
  })
  @Matches(/^[A-Za-z0-9 ]+$/, {
    message: 'THis field only permits letters and numbers and spaces.',
  })
  name: string;

  @ApiProperty({ description: 'Nombre del atributo' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'SKU del atributo' })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9-]+$/, {
    message: 'El SKU solo puede contener letras mayúsculas, números y guiones.',
  })
  sku: string;

  @IsNotEmpty({
    message: 'De-activation of an attributes/types.',
  })
  @ApiProperty({
    description: 'De-activation of an attributes/types. True or False.',
    example: 'true',
  })
  @IsBoolean({
    message: 'To unactivate/activate attributes/types',
  })
  status: boolean;
}
