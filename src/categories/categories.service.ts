import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Convertir el nombre a mayúsculas
    const normalizedName = createCategoryDto.name.toUpperCase();

    // Verificar si ya existe una categoría con el mismo nombre (en mayúsculas)
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: normalizedName },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Ya existe una categoría con el nombre '${normalizedName}'`,
      );
    }

    // Crear la categoría con el nombre en mayúsculas
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      name: normalizedName,
    });
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({
      relations: [
        'subcategories',
        'subcategories.attributeType',
        'subcategories.attributeType.attributes',
      ],
    });
  }

  async findOneById(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return category;
  }

  async findOneByName(name: string) {
    // Convertir el nombre de búsqueda a mayúsculas para consistencia
    const normalizedName = name.toUpperCase();
    const category = await this.categoryRepository.findOne({
      where: { name: normalizedName },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoría con nombre ${normalizedName} no encontrada`,
      );
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Verificar si la categoría existe
    const existingCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    // Preparar los datos de actualización
    const updateData = { ...updateCategoryDto };

    // Si se está actualizando el nombre, convertir a mayúsculas y verificar duplicados
    if (updateCategoryDto.name) {
      const normalizedName = updateCategoryDto.name.toUpperCase();

      // Solo verificar duplicados si el nombre es diferente al actual
      if (normalizedName !== existingCategory.name) {
        const categoryWithSameName = await this.categoryRepository.findOne({
          where: { name: normalizedName },
        });

        if (categoryWithSameName) {
          throw new ConflictException(
            `Ya existe una categoría con el nombre '${normalizedName}'`,
          );
        }
      }

      // Actualizar con el nombre en mayúsculas
      updateData.name = normalizedName;
    }

    // Actualizar la categoría
    await this.categoryRepository.update(id, updateData);

    // Retornar la categoría actualizada
    return this.categoryRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    // Verificar si la categoría existe
    const existingCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    // Marcar como inactiva (soft delete)
    await this.categoryRepository.update(id, { status: false });

    return {
      message: `Categoría con ID ${id} ha sido desactivada exitosamente`,
    };
  }
}
