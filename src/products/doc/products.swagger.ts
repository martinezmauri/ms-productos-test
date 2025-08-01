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
import { CompleteProductDto } from '../dto/complete-product.dto';
import { Product } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';

export function CreateProductDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo producto',
      description:
        'Crea un producto en el sistema. El nombre debe ser único. Si el producto ya existe, devuelve un error 409.',
    }),
    ApiBody({
      type: CreateProductDto,
      description: 'Datos necesarios para crear el producto',
    }),
    ApiOkResponse({
      description: 'Producto creado exitosamente',
      type: CompleteProductDto,
    }),
    ApiConflictResponse({
      description: 'El producto ya existe',
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
    }),
    ApiResponse({ status: HttpStatus.CREATED }),
  );
}

export function GetAllProductsDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los productos',
      description: 'Retorna una lista de todos los productos disponibles',
    }),
    ApiOkResponse({
      description: 'Lista de productos obtenida exitosamente',
      type: [CompleteProductDto],
    }),
  );
}

export function GetProductByIdDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un producto por ID',
      description: 'Retorna un producto específico basado en su ID único',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del producto',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiOkResponse({
      description: 'Producto encontrado exitosamente',
      type: CompleteProductDto,
    }),
    ApiNotFoundResponse({
      description: 'Producto no encontrado',
    }),
    ApiBadRequestResponse({
      description: 'ID inválido',
    }),
  );
}

export function UpdateProductDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un producto',
      description:
        'Actualiza los datos de un producto existente. Si el producto no existe, devuelve un error 404. Si el nombre ya existe, devuelve un error 409.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del producto a actualizar',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiBody({
      type: UpdateProductDto,
      description: 'Datos del producto a actualizar',
    }),
    ApiOkResponse({
      description: 'Producto actualizado exitosamente',
      type: CompleteProductDto,
    }),
    ApiNotFoundResponse({
      description: 'Producto no encontrado - El producto con el ID especificado no existe',
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
    }),
    ApiConflictResponse({
      description: 'El nombre del producto ya existe - Ya existe otro producto con el nombre especificado',
    }),
  );
}

export function RemoveProductDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Desactivar un producto',
      description:
        'Desactiva un producto del sistema (soft delete). Si el producto no existe, devuelve un error 404.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del producto a desactivar',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiOkResponse({
      description: 'Producto desactivado exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Producto con ID 123e4567-e89b-12d3-a456-426614174000 ha sido desactivado exitosamente',
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Producto no encontrado - El producto con el ID especificado no existe',
    }),
    ApiBadRequestResponse({
      description: 'ID inválido',
    }),
    ApiResponse({ status: HttpStatus.OK }),
  );
}
