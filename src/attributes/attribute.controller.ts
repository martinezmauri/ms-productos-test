import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributesService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import {
  CreateAttributeDoc,
  GetAllAttributesDoc,
  GetAttributeByIdDoc,
  UpdateAttributeDoc,
  RemoveAttributeDoc,
  GetAttributeByNameDoc,
  GetAttributeByAttributeNameDoc,
} from './doc/attribute.swagger';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  @CreateAttributeDoc()
  create(@Body() createData: CreateAttributeDto) {
    return this.attributesService.create(createData);
  }

  @Get()
  @GetAllAttributesDoc()
  findAll() {
    return this.attributesService.findAll();
  }

  @Get(':id')
  @GetAttributeByIdDoc()
  findOne(@Param('id') id: string) {
    return this.attributesService.findOneById(id);
  }

  @Get('findOneByName/:name')
  @GetAttributeByNameDoc()
  findOneByName(@Param('name') name: string) {
    return this.attributesService.findOneById(name);
  }

  @Get('findOneByAttributeTypeName/:name')
  @GetAttributeByAttributeNameDoc()
  findOneByAttributeTypeName(@Param('name') name: string) {
    return this.attributesService.findOneByAttributeTypeName(name);
  }

  @Patch(':id')
  @UpdateAttributeDoc()
  update(@Param('id') id: string, @Body() updateData: UpdateAttributeDto) {
    return this.attributesService.update(id, updateData);
  }

  @Delete(':id')
  @RemoveAttributeDoc()
  remove(@Param('id') id: string) {
    return this.attributesService.remove(id);
  }
}
