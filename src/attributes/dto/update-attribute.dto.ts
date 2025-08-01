import { PickType } from '@nestjs/swagger';
import { CompleteAttributeDto } from './complete-attribute.dto';

export class UpdateAttributeDto extends PickType(CompleteAttributeDto, [
  'sku',
  'status',
] as const) {}
