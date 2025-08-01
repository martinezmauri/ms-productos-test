import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CompleteProductDto } from './dto/complete-product.dto';
import {
  CreateProductDoc,
  GetAllProductsDoc,
  GetProductByIdDoc,
  RemoveProductDoc,
  UpdateProductDoc,
} from './doc/products.swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @CreateProductDoc()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @GetAllProductsDoc()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @GetProductByIdDoc()
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOneById(id);
  }

  @Patch(':id')
  @UpdateProductDoc()
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @RemoveProductDoc()
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
