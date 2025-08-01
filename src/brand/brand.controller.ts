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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CompleteBrandDto } from './dto/complete-brand.dto';

@ApiTags('Brands')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva marca',
    description:
      'Crea una nueva marca con un nombre único y estado activo. El nombre se convierte automáticamente a mayúsculas. Si el nombre ya existe, devuelve un error 409.',
  })
  @ApiBody({
    type: CreateBrandDto,
    description:
      'Datos de la marca a crear (el nombre se convertirá a mayúsculas)',
  })
  @ApiCreatedResponse({
    description: 'Marca creada exitosamente',
    type: CompleteBrandDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
  })
  @ApiConflictResponse({
    description:
      'El nombre de marca ya existe - Ya existe una marca con el nombre especificado',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las marcas',
    description: 'Retorna una lista de todas las marcas disponibles',
  })
  @ApiOkResponse({
    description: 'Lista de marcas obtenida exitosamente',
    type: [CompleteBrandDto],
  })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una marca por ID',
    description: 'Retorna una marca específica basada en su ID único',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la marca',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Marca encontrada exitosamente',
    type: CompleteBrandDto,
  })
  @ApiNotFoundResponse({
    description: 'Marca no encontrada',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
  })
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOneById(id);
  }

  @Get('getbyname/:brandName')
  @ApiOperation({
    summary: 'Obtener una marca por su nombre',
    description:
      'Retorna una marca específica basada en su nombre. La búsqueda es insensible a mayúsculas/minúsculas.',
  })
  @ApiParam({
    name: 'brandName',
    description:
      'Nombre de la marca (se convertirá a mayúsculas para la búsqueda)',
    example: 'nike',
  })
  @ApiOkResponse({
    description: 'Marca encontrada exitosamente',
    type: CompleteBrandDto,
  })
  @ApiNotFoundResponse({
    description: 'Marca no encontrada',
  })
  findOneByName(@Param('brandName') brandName: string) {
    return this.brandService.findOneByName(brandName);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una marca',
    description:
      'Actualiza los datos de una marca existente. Si se actualiza el nombre, se convierte automáticamente a mayúsculas. Si la marca no existe, devuelve un error 404. Si el nuevo nombre ya existe, devuelve un error 409.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la marca a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateBrandDto,
    description:
      'Datos de la marca a actualizar (el nombre se convertirá a mayúsculas)',
  })
  @ApiOkResponse({
    description: 'Marca actualizada exitosamente',
    type: CompleteBrandDto,
  })
  @ApiNotFoundResponse({
    description:
      'Marca no encontrada - La marca con el ID especificado no existe',
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
  })
  @ApiConflictResponse({
    description:
      'El nombre de marca ya existe - Ya existe otra marca con el nombre especificado',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Desactivar una marca',
    description:
      'Desactiva una marca del sistema (soft delete). Si la marca no existe, devuelve un error 404.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la marca a desactivar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Marca desactivada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Marca con ID 123e4567-e89b-12d3-a456-426614174000 ha sido desactivada exitosamente',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description:
      'Marca no encontrada - La marca con el ID especificado no existe',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
  })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.remove(id);
  }
}
