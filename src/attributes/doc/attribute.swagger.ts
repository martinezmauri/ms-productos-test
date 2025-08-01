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
import { CompleteAttributeDto } from '../dto/complete-attribute.dto';

export function CreateAttributeDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo atributo asociado a un tipo de atributos',
      description: 'Crea un nuevo atributo asociado a un tipo.',
    }),
    ApiBody({ type: CompleteAttributeDto }),
    ApiCreatedResponse({
      description: 'Atributo creado exitosamente',
      type: CompleteAttributeDto,
    }),
    ApiBadRequestResponse({ description: 'Datos de entrada inválidos' }),
    ApiConflictResponse({
      description: 'Ya existe un atributo con ese nombre o SKU',
    }),
  );
}

export function GetAllAttributesDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los atributos',
      description: 'Retorna una lista de todos los atributos.',
    }),
    ApiOkResponse({
      description: 'Lista de atributos obtenida exitosamente',
      type: [CompleteAttributeDto],
    }),
  );
}

export function GetAttributeByIdDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un atributo por ID',
      description: 'Retorna un atributo específico por su ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del atributo',
      example: 'uuid',
    }),
    ApiOkResponse({
      description: 'Atributo encontrado exitosamente',
      type: CompleteAttributeDto,
    }),
    ApiNotFoundResponse({ description: 'Atributo no encontrado' }),
  );
}

export function GetAttributeByNameDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un atributo por su Nombre',
      description: 'Retorna un atributo específico para el nombre buscado.',
    }),
    ApiParam({
      name: 'name',
      description: 'Nombre único del atributo',
      example: 'XL',
    }),
    ApiOkResponse({
      description: 'Atributo encontrado exitosamente',
      type: CompleteAttributeDto,
    }),
    ApiNotFoundResponse({ description: 'Atributos no encontrado' }),
  );
}

export function GetAttributeByAttributeNameDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener los atributos a partir del nombre del tipo de atributo',
      description:
        'Retorna lista de atributos específico para el nombre buscado.',
    }),
    ApiParam({
      name: 'name',
      description: 'Nombre del tipo de atributo',
      example: 'Talle',
    }),
    ApiOkResponse({
      description: 'Atributo encontrado exitosamente',
      type: CompleteAttributeDto,
    }),
    ApiNotFoundResponse({ description: 'Atributos no encontrado' }),
  );
}

export function UpdateAttributeDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un atributo',
      description: 'Actualiza los datos de un atributo existente.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del atributo a actualizar',
      example: 'uuid',
    }),
    ApiBody({ type: CompleteAttributeDto }),
    ApiOkResponse({
      description: 'Atributo actualizado exitosamente',
      type: CompleteAttributeDto,
    }),
    ApiNotFoundResponse({ description: 'Atributo no encontrado' }),
    ApiBadRequestResponse({ description: 'Datos de entrada inválidos' }),
    ApiConflictResponse({
      description: 'Ya existe un atributo con ese nombre o SKU',
    }),
  );
}

export function RemoveAttributeDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar un atributo',
      description: 'Elimina un atributo del sistema.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del atributo a eliminar',
      example: 'uuid',
    }),
    ApiOkResponse({ description: 'Atributo eliminado exitosamente' }),
    ApiNotFoundResponse({ description: 'Atributo no encontrado' }),
  );
}
