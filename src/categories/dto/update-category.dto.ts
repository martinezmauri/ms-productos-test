import { PartialType, PickType } from '@nestjs/swagger';
import { CompleteCategoryDto } from './complete-category.dto';

export class UpdateCategoryDto extends PickType(CompleteCategoryDto, [
  'name',
  'description',
  'sku',
  'status',
] as const) {}
