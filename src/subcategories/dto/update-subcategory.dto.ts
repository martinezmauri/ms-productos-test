import { PartialType, PickType } from '@nestjs/swagger';
import { CompleteSubcategoryDto } from './complete-subcategory.dto';

export class UpdateSubcategoryDto extends PickType(CompleteSubcategoryDto, [
  'name',
  'description',
  'sku',
  'status',
  'categoryId',
] as const) {}
