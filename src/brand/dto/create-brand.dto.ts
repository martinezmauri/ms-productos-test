import { ApiProperty, PickType } from '@nestjs/swagger';
import { CompleteBrandDto } from './complete-brand.dto';

export class CreateBrandDto extends PickType(CompleteBrandDto, [
  'brandName',
  'isActive',
] as const) {}
