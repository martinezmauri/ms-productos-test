import { PickType } from '@nestjs/swagger';
import { CompleteCategoryDto } from './complete-category.dto';

export class CreateCategoryDto extends PickType(CompleteCategoryDto, [
  'name',
  'description',
  'sku',
  'status',
] as const) {}
