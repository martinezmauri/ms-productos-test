import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    // Convertir el nombre a mayúsculas
    const normalizedBrandName = createBrandDto.brandName.toUpperCase();

    // Verificar si ya existe una marca con el mismo nombre (en mayúsculas)
    const existingBrand = await this.brandRepository.findOne({
      where: { brandName: normalizedBrandName },
    });

    if (existingBrand) {
      throw new ConflictException(
        `Ya existe una marca con el nombre '${normalizedBrandName}'`,
      );
    }

    // Crear la marca con el nombre en mayúsculas
    const brand = this.brandRepository.create({
      ...createBrandDto,
      brandName: normalizedBrandName,
    });
    return this.brandRepository.save(brand);
  }

  findAll() {
    return this.brandRepository.find();
  }

  async findOneById(id: string) {
    const brand = await this.brandRepository.findOne({ where: { id } });

    if (!brand) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }

    return brand;
  }

  async findOneByName(brandName: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedBrandName = brandName.toUpperCase();
    const brand = await this.brandRepository.findOne({
      where: { brandName: normalizedBrandName },
    });

    if (!brand) {
      throw new NotFoundException(
        `Marca con nombre ${normalizedBrandName} no encontrada`,
      );
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    // Verificar si la marca existe
    const existingBrand = await this.brandRepository.findOne({ where: { id } });

    if (!existingBrand) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }

    // Preparar los datos de actualización
    const updateData = { ...updateBrandDto };

    // Si se está actualizando el nombre, convertir a mayúsculas y verificar duplicados
    if (updateBrandDto.brandName) {
      const normalizedBrandName = updateBrandDto.brandName.toUpperCase();

      // Solo verificar duplicados si el nombre es diferente al actual
      if (normalizedBrandName !== existingBrand.brandName) {
        const brandWithSameName = await this.brandRepository.findOne({
          where: { brandName: normalizedBrandName },
        });

        if (brandWithSameName) {
          throw new ConflictException(
            `Ya existe una marca con el nombre '${normalizedBrandName}'`,
          );
        }
      }

      // Actualizar con el nombre en mayúsculas
      updateData.brandName = normalizedBrandName;
    }

    // Actualizar la marca
    await this.brandRepository.update(id, updateData);

    // Retornar la marca actualizada
    return this.brandRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    // Verificar si la marca existe
    const existingBrand = await this.brandRepository.findOne({ where: { id } });

    if (!existingBrand) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }

    // Marcar como inactiva (soft delete)
    await this.brandRepository.update(id, { isActive: false });

    return { message: `Marca con ID ${id} ha sido desactivada exitosamente` };
  }
}
