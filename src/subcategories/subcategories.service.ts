import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createSubcategory: CreateSubcategoryDto) {
    // Convertir el nombre a mayúsculas
    const normalizedName = createSubcategory.name.toUpperCase();

    // Verificar que la categoría referenciada exista
    if (!createSubcategory.categoryId) {
      throw new ConflictException(
        'El campo categoryId es obligatorio y debe existir',
      );
    }
    const category = await this.categoryRepository.findOne({
      where: { id: createSubcategory.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `La categoría con ID '${createSubcategory.categoryId}' no existe`,
      );
    }

    // Verificar si ya existe una subcategory con el mismo nombre (en mayúsculas)
    const existingSubcategory = await this.subcategoryRepository.findOne({
      where: { name: normalizedName },
    });

    if (existingSubcategory) {
      throw new ConflictException(
        `Ya existe una Subcategory con el nombre '${normalizedName}'`,
      );
    }

    // Crear con el nombre en mayúsculas y la categoría validada
    const subcategory = this.subcategoryRepository.create({
      ...createSubcategory,
      name: normalizedName,
      category: category,
    });

    return this.subcategoryRepository.save(subcategory);
  }

  findAll() {
    return this.subcategoryRepository.find({
      relations: ['category', 'attributeType'],
    });
  }

  async findOneById(id: string) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!subcategory) {
      throw new NotFoundException(`Sucategory con ID ${id} no encontrada`);
    }
    return subcategory;
  }

  async findOneByName(name: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedName = name.toUpperCase();
    const subcategory = await this.subcategoryRepository.findOne({
      where: { name: normalizedName },
      relations: ['category'],
    });

    if (!subcategory) {
      throw new NotFoundException(
        `Subcategoria con nombre ${normalizedName} no encontrada`,
      );
    }

    return subcategory;
  }

  async update(id: string, updateSubcategory: UpdateSubcategoryDto) {
    // Verificar si  existe
    const existingSubcategory = await this.subcategoryRepository.findOne({
      where: { id },
    });

    if (!existingSubcategory) {
      throw new NotFoundException(`Sucategoria con ID ${id} no encontrada`);
    }

    // Preparar los datos de actualización
    const updateData = { ...updateSubcategory };

    // Si se está actualizando el nombre, convertir a mayúsculas y verificar duplicados
    if (updateData.name) {
      const normalizedName = updateData.name.toUpperCase();

      // Solo verificar duplicados si el nombre es diferente al actual
      if (normalizedName !== existingSubcategory.name) {
        const withSameName = await this.subcategoryRepository.findOne({
          where: { name: normalizedName },
        });

        if (withSameName) {
          throw new ConflictException(
            `Ya existe una Subcategoria con el nombre '${normalizedName}'`,
          );
        }
      }

      // Actualizar con el nombre en mayúsculas
      updateData.name = normalizedName;
    }

    // Actualizar la marca
    await this.subcategoryRepository.update(id, updateData);

    // Retornar la marca actualizada
    return this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async remove(id: string) {
    // Verificar si ya existe
    const existing = await this.subcategoryRepository.findOne({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Subcategoria con ID ${id} no encontrada`);
    }

    // Marcar como inactiva (soft delete)
    await this.subcategoryRepository.update(id, { status: false });

    return {
      message: `Subcategoria con ID ${id} ha sido desactivada exitosamente`,
    };
  }
}
