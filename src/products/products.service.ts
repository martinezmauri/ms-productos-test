import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Brand } from '../brand/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Validar existencia de relaciones
    if (!createProductDto.categoryId) {
      throw new ConflictException(
        'El campo categoryId es obligatorio y debe existir',
      );
    }
    if (!createProductDto.subcategoryId) {
      throw new ConflictException(
        'El campo subcategoryId es obligatorio y debe existir',
      );
    }
    if (!createProductDto.companyId) {
      throw new ConflictException(
        'El campo companyId es obligatorio y debe existir',
      );
    }
    if (!createProductDto.sku) {
      throw new ConflictException('El campo sku es obligatorio');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `La categoría con ID '${createProductDto.categoryId}' no existe`,
      );
    }
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: createProductDto.subcategoryId },
    });
    if (!subcategory) {
      throw new NotFoundException(
        `La subcategoría con ID '${createProductDto.subcategoryId}' no existe`,
      );
    }

    // Validar SKU único
    const existingProduct = await this.productRepository.findOne({
      where: { sku: createProductDto.sku },
    });
    if (existingProduct) {
      throw new ConflictException(
        `Ya existe un producto con el SKU '${createProductDto.sku}'`,
      );
    }

    // Validar Brand si existe
    let brand: Brand | undefined = undefined;
    if ((createProductDto as any).brandId) {
      const foundBrand = await this.brandRepository.findOne({
        where: { id: (createProductDto as any).brandId },
      });
      if (!foundBrand) {
        throw new NotFoundException(
          `La marca con ID '${(createProductDto as any).brandId}' no existe`,
        );
      }
      brand = foundBrand || undefined; // Asegurar que sea undefined si es null
    }
    // Crear producto
    const product = this.productRepository.create({
      ...createProductDto,
      category,
      subcategory,
      brand,
    });
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({
      relations: ['category', 'subcategory', 'brand'],
    });
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'subcategory', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Si se actualiza el SKU, verificar duplicados
    if (updateProductDto.sku && updateProductDto.sku !== existingProduct.sku) {
      const withSameSku = await this.productRepository.findOne({
        where: { sku: updateProductDto.sku },
      });
      if (withSameSku) {
        throw new ConflictException(
          `Ya existe un producto con el SKU '${updateProductDto.sku}'`,
        );
      }
    }

    // Si se actualizan relaciones, validarlas
    let category: Category | undefined = existingProduct.category;
    let subcategory: Subcategory | undefined = existingProduct.subcategory;
    let brand: Brand | undefined = existingProduct.brand;

    if (
      updateProductDto.categoryId &&
      updateProductDto.categoryId !== category?.id
    ) {
      const foundCategory = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!foundCategory) {
        throw new NotFoundException(
          `La categoría con ID '${updateProductDto.categoryId}' no existe`,
        );
      }
      category = foundCategory;
    }

    if (
      updateProductDto.subcategoryId &&
      updateProductDto.subcategoryId !== subcategory?.id
    ) {
      const foundSubcategory = await this.subcategoryRepository.findOne({
        where: { id: updateProductDto.subcategoryId },
      });
      if (!foundSubcategory) {
        throw new NotFoundException(
          `La subcategoría con ID '${updateProductDto.subcategoryId}' no existe`,
        );
      }
      subcategory = foundSubcategory;
    }

    if (
      (updateProductDto as any).brandId &&
      (updateProductDto as any).brandId !== brand?.id
    ) {
      const foundBrand = await this.brandRepository.findOne({
        where: { id: (updateProductDto as any).brandId },
      });
      if (!foundBrand) {
        throw new NotFoundException(
          `La marca con ID '${(updateProductDto as any).brandId}' no existe`,
        );
      }
      brand = foundBrand;
    } else if ((updateProductDto as any).brandId === null) {
      // Si se envía explícitamente null para brandId, establecemos brand como undefined
      brand = undefined;
    }

    // Actualizar producto
    const updateData: any = {
      ...updateProductDto,
      category,
      subcategory,
      brand,
    };
    await this.productRepository.update(id, updateData);
    return this.productRepository.findOne({
      where: { id },
      relations: ['category', 'subcategory', 'brand'],
    });
  }
  async remove(id: string) {
    const existing = await this.productRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    await this.productRepository.update(id, { status: false });
    return {
      message: `Producto con ID ${id} ha sido desactivado exitosamente`,
    };
  }
}
