import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import { AttributeType } from './entities/attributeType.entity';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(AttributeType)
    private attributeTypeRepository: Repository<AttributeType>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  async create(createData: CreateAttributeDto) {
    // Convertir el nombre a mayúsculas
    const normalizedName = createData.name.toUpperCase();

    // Verificar si ya existe  con el mismo nombre (en mayúsculas)
    const existingData = await this.attributeRepository.findOne({
      where: { name: normalizedName },
    });

    if (existingData) {
      throw new ConflictException(
        `Ya existe un  Atributo con el nombre '${normalizedName}'`,
      );
    }

    // Crear  con el nombre en mayúsculas
    const attributeType = this.attributeRepository.create({
      ...createData,
      name: normalizedName,
    });
    return this.attributeRepository.save(attributeType);
  }

  async findAll() {
    return this.attributeRepository.find({
      relations: ['attributeType'],
    });
  }

  async findOneById(id: string) {
    const existingData = await this.attributeRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      throw new NotFoundException(`Atributo con ID ${id} no encontrada`);
    }

    return existingData;
  }

  async findOneByName(name: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedName = name.toUpperCase();
    const records = await this.attributeRepository.findOne({
      where: { name: normalizedName },
    });

    if (!records) {
      throw new NotFoundException(
        `Atrbutos con nombre ${normalizedName} no encontrada`,
      );
    }

    return records;
  }

  async findOneByAttributeTypeName(name: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedName = name.toUpperCase();
    const record = await this.attributeTypeRepository.findOne({
      where: { name: normalizedName },
    });

    if (!record) {
      throw new NotFoundException(
        `Tipo de Atributo  con nombre ${normalizedName} no encontrada`,
      );
    }

    const recordsAttribute = await this.attributeRepository.findOne({
      where: { attributeType: record },
    });
    if (!recordsAttribute) {
      throw new NotFoundException(
        `No hay Atributos para este Tipo de Atributos ${normalizedName}`,
      );
    }

    return recordsAttribute;
  }

  async update(id: string, updateData: UpdateAttributeDto) {
    // Verificar si la categoría existe
    const existingData = await this.attributeRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      throw new NotFoundException(`Atributo con ID ${id} no encontrada`);
    }

    await this.attributeRepository.update(id, updateData);
    return this.attributeRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    // Verificar si  existe
    const existingData = await this.attributeRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      throw new NotFoundException(`TAtributo con ID ${id} no encontrada`);
    }

    // Marcar como inactiva (soft delete)
    await this.attributeRepository.update(id, { status: false });

    return {
      message: `Tipo de Atributo con ID ${id} ha sido desactivada exitosamente`,
    };
  }
}
