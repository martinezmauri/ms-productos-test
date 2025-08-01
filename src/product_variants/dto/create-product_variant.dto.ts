import { PickType } from '@nestjs/swagger';
import { CompleteProductVariantDto } from './complete-product_variant.dto';

export class CreateProductVariantDto extends PickType(CompleteProductVariantDto, [
  'name',
  'description',
  'price',
  'stock',
  'sku',
  'categoryId',
  'subcategoryId',
  'productId',
  'attributeId',
  'companyId',
] as const) {}
