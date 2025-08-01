import { PickType } from '@nestjs/swagger';
import { CompleteProductDto } from './complete-product.dto';

export class CreateProductDto extends PickType(CompleteProductDto, [
  'name',
  'description',
  'priceBase',
  'stock',
  'sku',
  'categoryId',
  'subcategoryId',
  'companyId',
  'availability',
  'status',
  'images',
  'created_at',
  'updated_at',
] as const) {}
