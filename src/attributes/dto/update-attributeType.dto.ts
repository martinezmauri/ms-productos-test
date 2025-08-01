import { PickType } from '@nestjs/swagger';
import { CompleteAttributeDto } from './complete-attribute.dto';

export class UpdateAttributeTypeDto extends PickType(CompleteAttributeDto, [
  'description',
  'sku',
  'status',
] as const) {}
