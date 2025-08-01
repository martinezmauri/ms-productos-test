import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CompleteSubcategoryDto } from './dto/complete-subcategory.dto';
import {
  CreateSubcategoriesDoc,
  GetAllSubcategoriesDoc,
  GetSubcategoriesByIdDoc,
  RemoveSubcategoriesDoc,
  UpdateSubcategoriesDoc,
} from './doc/subcategory.swagger';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @CreateSubcategoriesDoc()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  @GetAllSubcategoriesDoc()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  @GetSubcategoriesByIdDoc()
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.subcategoriesService.findOneById(id);
  }

  @Get('getbyname/:name')
  findOneByName(@Param('name') name: string) {
    return this.subcategoriesService.findOneByName(name);
  }

  @Patch(':id')
  @UpdateSubcategoriesDoc()
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  @RemoveSubcategoriesDoc()
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
