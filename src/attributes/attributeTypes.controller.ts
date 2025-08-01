import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributeTypesService } from './attributeTypes.service';
import { CreateAttributeTypeDto } from './dto/create-attributeType.dto';
import { UpdateAttributeTypeDto } from './dto/update-attributeType.dto';
import {
  CreateAttributeTypeDoc,
  GetAllAttributeTypesDoc,
  GetAttributeTypeByIdDoc,
  UpdateAttributeTypeDoc,
  RemoveAttributeTypeDoc,
  GetAttributeTypesByNameDoc,
  GetAttributeBySubcategoryNameDoc,
} from './doc/attributeType.swagger';

@Controller('attributeTypes')
export class AttributeTypesController {
  constructor(private readonly attributeTypesService: AttributeTypesService) {}

  @Post()
  @CreateAttributeTypeDoc()
  create(@Body() createData: CreateAttributeTypeDto) {
    return this.attributeTypesService.create(createData);
  }

  @Get()
  @GetAllAttributeTypesDoc()
  findAll() {
    return this.attributeTypesService.findAll();
  }

  @Get(':id')
  @GetAttributeTypeByIdDoc()
  findOne(@Param('id') id: string) {
    return this.attributeTypesService.findOneById(id);
  }

  @Get('findOneByName/:name')
  @GetAttributeTypesByNameDoc()
  findOneByName(@Param('name') name: string) {
    return this.attributeTypesService.findOneByName(name);
  }

  @Get('findOneBySubcateogoryName/:name')
  @GetAttributeBySubcategoryNameDoc()
  findOneByAttributeTypeName(@Param('name') name: string) {
    return this.attributeTypesService.findOneBySubcategory(name);
  }

  @Patch(':id')
  @UpdateAttributeTypeDoc()
  update(@Param('id') id: string, @Body() updateData: UpdateAttributeTypeDto) {
    return this.attributeTypesService.update(id, updateData);
  }

  @Delete(':id')
  @RemoveAttributeTypeDoc()
  remove(@Param('id') id: string) {
    return this.attributeTypesService.remove(id);
  }
}
