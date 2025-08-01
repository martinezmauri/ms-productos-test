import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesService } from './attribute.service';
import { AttributesController } from './attribute.controller';
import { Attribute } from './entities/attribute.entity';
import { AttributeType } from './entities/attributeType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeType])],
  controllers: [AttributesController],
  providers: [AttributesService],
  exports: [AttributesService],
})
export class AttributesModule {}
