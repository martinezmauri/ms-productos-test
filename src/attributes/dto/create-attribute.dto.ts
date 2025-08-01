import { PickType } from '@nestjs/swagger';
import { CompleteAttributeDto } from './complete-attribute.dto';

export class CreateAttributeDto extends PickType(CompleteAttributeDto, [
  'name',
  'sku',
  'status',
] as const) {}
