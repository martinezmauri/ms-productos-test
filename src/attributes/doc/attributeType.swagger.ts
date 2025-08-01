import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AttributeType } from '../entities/attributeType.entity';

export function CreateAttributeTypeDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo tipo de atributo',
      description:
        'Crea un nuevo tipo de atributo (header) que puede tener varios atributos asociados.',
    }),
    ApiBody({ type: AttributeType }),
    ApiCreatedResponse({
      description: 'Tipo de atributo creado exitosamente',
      type: AttributeType,
    }),
    ApiBadRequestResponse({ description: 'Datos de entrada inválidos' }),
    ApiConflictResponse({
      description: 'Ya existe un tipo de atributo con ese nombre o SKU',
    }),
  );
}

export function GetAllAttributeTypesDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los tipos de atributo',
      description: 'Retorna una lista de todos los tipos de atributo.',
    }),
    ApiOkResponse({
      description: 'Lista de tipos de atributo obtenida exitosamente',
      type: [AttributeType],
    }),
  );
}

export function GetAttributeTypeByIdDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un tipo de atributo por ID',
      description: 'Retorna un tipo de atributo específico por su ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del tipo de atributo',
      example: 'uuid',
    }),
    ApiOkResponse({
      description: 'Tipo de atributo encontrado exitosamente',
      type: AttributeType,
    }),
    ApiNotFoundResponse({ description: 'Tipo de atributo no encontrado' }),
  );
}

export function GetAttributeTypesByNameDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un tipo de atributo por su Nombre',
      description:
        'Retorna un tipo de atributo específico para el nombre buscado.',
    }),
    ApiParam({
      name: 'name',
      description: 'Nombre único del tipo de atributo',
      example: 'Talla',
    }),
    ApiOkResponse({
      description: 'Tipo de Atributo encontrado exitosamente',
      type: CreateAttributeTypeDoc,
    }),
    ApiNotFoundResponse({ description: 'Tipos de Atributos no encontrado' }),
  );
}

export function GetAttributeBySubcategoryNameDoc() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Obtener los tipos de atributos a partir del nombre de la subcategoría',
      description:
        'Retorna lista de tipos de atributos específico para el nombre de la subcateogria.',
    }),
    ApiParam({
      name: 'name',
      description: 'Nombre de la subcategoria ',
      example: 'Remeras',
    }),
    ApiOkResponse({
      description: 'Tipo de Atributo encontrado exitosamente',
      type: CreateAttributeTypeDoc,
    }),
    ApiNotFoundResponse({ description: 'Tipo de Atributos no encontrado' }),
  );
}

export function UpdateAttributeTypeDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un tipo de atributo',
      description: 'Actualiza los datos de un tipo de atributo existente.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del tipo de atributo a actualizar',
      example: 'uuid',
    }),
    ApiBody({ type: AttributeType }),
    ApiOkResponse({
      description: 'Tipo de atributo actualizado exitosamente',
      type: AttributeType,
    }),
    ApiNotFoundResponse({ description: 'Tipo de atributo no encontrado' }),
    ApiBadRequestResponse({ description: 'Datos de entrada inválidos' }),
    ApiConflictResponse({
      description: 'Ya existe un tipo de atributo con ese nombre o SKU',
    }),
  );
}

export function RemoveAttributeTypeDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar un tipo de atributo',
      description: 'Elimina un tipo de atributo del sistema.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del tipo de atributo a eliminar',
      example: 'uuid',
    }),
    ApiOkResponse({ description: 'Tipo de atributo eliminado exitosamente' }),
    ApiNotFoundResponse({ description: 'Tipo de atributo no encontrado' }),
  );
}
