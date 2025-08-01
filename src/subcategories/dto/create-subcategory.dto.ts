import { PickType } from '@nestjs/swagger';
import { CompleteSubcategoryDto } from './complete-subcategory.dto';

export class CreateSubcategoryDto extends PickType(CompleteSubcategoryDto, [
  'name',
  'description',
  'sku',
  'status',
  'categoryId',
] as const) {}
