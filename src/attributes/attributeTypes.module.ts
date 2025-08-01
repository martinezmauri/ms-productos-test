import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeType } from './entities/attributeType.entity';
import { Attribute } from './entities/attribute.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { AttributeTypesService } from './attributeTypes.service';
import { AttributeTypesController } from './attributeTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeType, Attribute, Subcategory])],
  controllers: [AttributeTypesController],
  providers: [AttributeTypesService],
  exports: [AttributeTypesService],
})
export class AttributeTypesModule {}
