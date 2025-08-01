import { PickType } from '@nestjs/swagger';
import { CompleteAttributeDto } from './complete-attribute.dto';

export class CreateAttributeTypeDto extends PickType(CompleteAttributeDto, [
  'name',
  'description',
  'sku',
  'status',
] as const) {}
