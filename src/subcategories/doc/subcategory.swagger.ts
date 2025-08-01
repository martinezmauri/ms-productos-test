import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CompleteSubcategoryDto } from '../dto/complete-subcategory.dto';
import { Subcategory } from '../entities/subcategory.entity';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';

export function CreateSubcategoriesDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener una subcategoria por su nombre',
      description:
        'Retorna una subcategoria específica basada en su nombre. La búsqueda es insensible a mayúsculas/minúsculas.',
    }),
    ApiParam({
      name: 'name',
      description:
        'Nombre de la Subcategoria (se convertirá a mayúsculas para la búsqueda)',
      example: 'pantalon',
    }),
    ApiOkResponse({
      description: 'Subcategoria encontrada exitosamente',
      type: CompleteSubcategoryDto,
    }),
    ApiNotFoundResponse({
      description: 'Subcategoria no encontrada',
    }),
    ApiResponse({ status: HttpStatus.CREATED }),
  );
}

export function GetAllSubcategoriesDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todas las Subcategorias',
      description: 'Retorna una lista de todas las subcategorias disponibles',
    }),
    ApiOkResponse({
      description: 'Lista de Subcategorias obtenida exitosamente',
      type: [CompleteSubcategoryDto],
    }),
  );
}

export function GetSubcategoriesByIdDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener una Subcategoria por ID',
      description: 'Retorna una Subcategoria específica basada en su ID único',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único de la Subcategoria',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiOkResponse({
      description: 'Subcategoria encontrada exitosamente',
      type: CompleteSubcategoryDto,
    }),
    ApiBadRequestResponse({
      description: 'ID inválido',
    }),
  );
}

export function UpdateSubcategoriesDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar una subcategoria',
      description:
        'Actualiza los datos de una subcategoria existente. Si se actualiza el nombre, se convierte automáticamente a mayúsculas. Si la subcategoria no existe, devuelve un error 404. Si el nuevo nombre ya existe, devuelve un error 409.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único de la subcategoria a actualizar',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiBody({
      type: UpdateSubcategoryDto,
      description:
        'Datos de la subcategoria a actualizar (el nombre se convertirá a mayúsculas)',
    }),
    ApiOkResponse({
      description: 'subcategoria actualizada exitosamente',
      type: CompleteSubcategoryDto,
    }),
    ApiNotFoundResponse({
      description:
        'subcategoria no encontrada - La subcategoria con el ID especificado no existe',
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
    }),
    ApiConflictResponse({
      description:
        'El nombre de subcategoria ya existe - Ya existe otra subcategoria con el nombre especificado',
    }),
  );
}

export function RemoveSubcategoriesDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Desactivar una Subcategoria',
      description:
        'Desactiva una Subcategoria del sistema (soft delete). Si la marca no existe, devuelve un error 404.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único de la Subcategoria a desactivar',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiOkResponse({
      description: 'Subcategoria desactivada exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Subcategoria con ID 123e4567-e89b-12d3-a456-426614174000 ha sido desactivada exitosamente',
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description:
        'Sucategoria no encontrada - La marca con el ID especificado no existe',
    }),
    ApiBadRequestResponse({
      description: 'ID inválido',
    }),
    ApiResponse({ status: HttpStatus.OK }),
  );
}
