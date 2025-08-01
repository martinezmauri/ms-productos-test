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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CompleteCategoryDto } from './dto/complete-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva categoría',
    description:
      'Crea una nueva categoría con un nombre único y estado activo. El nombre se convierte automáticamente a mayúsculas. Si el nombre ya existe, devuelve un error 409.',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description:
      'Datos de la categoría a crear (el nombre se convertirá a mayúsculas)',
  })
  @ApiCreatedResponse({
    description: 'Categoría creada exitosamente',
    type: CompleteCategoryDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
  })
  @ApiConflictResponse({
    description:
      'El nombre de categoría ya existe - Ya existe una categoría con el nombre especificado',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las categorías',
    description: 'Retorna una lista de todas las categorías disponibles',
  })
  @ApiOkResponse({
    description: 'Lista de categorías obtenida exitosamente',
    type: [CompleteCategoryDto],
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una categoría por ID',
    description: 'Retorna una categoría específica basada en su ID único',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Categoría encontrada exitosamente',
    type: CompleteCategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Categoría no encontrada',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
  })
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOneById(id);
  }

  @Get('getbyname/:categoryName')
  @ApiOperation({
    summary: 'Obtener una categoría por su nombre',
    description:
      'Retorna una categoría específica basada en su nombre. La búsqueda es insensible a mayúsculas/minúsculas.',
  })
  @ApiParam({
    name: 'categoryName',
    description:
      'Nombre de la categoría (se convertirá a mayúsculas para la búsqueda)',
    example: 'ropa',
  })
  @ApiOkResponse({
    description: 'Categoría encontrada exitosamente',
    type: CompleteCategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Categoría no encontrada',
  })
  findOneByName(@Param('categoryName') categoryName: string) {
    return this.categoriesService.findOneByName(categoryName);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una categoría',
    description:
      'Actualiza los datos de una categoría existente. Si se actualiza el nombre, se convierte automáticamente a mayúsculas. Si la categoría no existe, devuelve un error 404. Si el nuevo nombre ya existe, devuelve un error 409.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la categoría a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateCategoryDto,
    description:
      'Datos de la categoría a actualizar (el nombre se convertirá a mayúsculas)',
  })
  @ApiOkResponse({
    description: 'Categoría actualizada exitosamente',
    type: CompleteCategoryDto,
  })
  @ApiNotFoundResponse({
    description:
      'Categoría no encontrada - La categoría con el ID especificado no existe',
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
  })
  @ApiConflictResponse({
    description:
      'El nombre de categoría ya existe - Ya existe otra categoría con el nombre especificado',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Desactivar una categoría',
    description:
      'Desactiva una categoría del sistema (soft delete). Si la categoría no existe, devuelve un error 404.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la categoría a desactivar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Categoría desactivada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Categoría con ID 123e4567-e89b-12d3-a456-426614174000 ha sido desactivada exitosamente',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description:
      'Categoría no encontrada - La categoría con el ID especificado no existe',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
  })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}