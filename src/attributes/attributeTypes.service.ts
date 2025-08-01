import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttributeTypeDto } from './dto/create-attributeType.dto';
import { UpdateAttributeTypeDto } from './dto/update-attributeType.dto';
import { AttributeType } from './entities/attributeType.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';

@Injectable()
export class AttributeTypesService {
  constructor(
    @InjectRepository(AttributeType)
    private attributeTypeRepository: Repository<AttributeType>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async create(createData: CreateAttributeTypeDto) {
    // Convertir el nombre a mayúsculas
    const normalizedName = createData.name.toUpperCase();

    // Verificar si ya existe  con el mismo nombre (en mayúsculas)
    const existingData = await this.attributeTypeRepository.findOne({
      where: { name: normalizedName },
    });

    if (existingData) {
      throw new ConflictException(
        `Ya existe un Tipo de Atributo con el nombre '${normalizedName}'`,
      );
    }

    // Crear  con el nombre en mayúsculas
    const attributeType = this.attributeTypeRepository.create({
      ...createData,
      name: normalizedName,
    });
    return this.attributeTypeRepository.save(attributeType);
  }

  async findAll() {
    return this.attributeTypeRepository.find({
      relations: ['attributes', 'subcategories'],
    });
  }

  async findOneById(id: string) {
    const existingData = await this.attributeTypeRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      throw new NotFoundException(
        `Tipo de Atributo con ID ${id} no encontrada`,
      );
    }

    return existingData;
  }

  async findOneByName(name: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedName = name.toUpperCase();
    const records = await this.attributeTypeRepository.findOne({
      where: { name: normalizedName },
    });

    if (!records) {
      throw new NotFoundException(
        `Tipos de atrbutos con nombre ${normalizedName} no encontrada`,
      );
    }

    return records;
  }

  async findOneBySubcategory(name: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedName = name.toUpperCase();
    const record = await this.subcategoryRepository.findOne({
      where: { name: normalizedName },
    });

    if (!record) {
      throw new NotFoundException(
        `Subcategoria  con nombre ${normalizedName} no encontrada`,
      );
    }

    const recordsType = await this.attributeTypeRepository.findOne({
      where: { subcategories: record },
    });
    if (!recordsType) {
      throw new NotFoundException(
        `No hay Tipos de Atributos para esta Subcategoria ${normalizedName}`,
      );
    }

    return recordsType;
  }

  async update(id: string, updateData: UpdateAttributeTypeDto) {
    // Verificar si la categoría existe
    const existingData = await this.attributeTypeRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      throw new NotFoundException(
        `Tipo de Atributo con ID ${id} no encontrada`,
      );
    }

    await this.attributeTypeRepository.update(id, updateData);
    return this.attributeTypeRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    // Verificar si  existe
    const existingData = await this.attributeTypeRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      throw new NotFoundException(
        `Tipo de Atributo con ID ${id} no encontrada`,
      );
    }

    // Marcar como inactiva (soft delete)
    await this.attributeTypeRepository.update(id, { status: false });

    return {
      message: `Tipo de Atributo con ID ${id} ha sido desactivada exitosamente`,
    };
  }
}
