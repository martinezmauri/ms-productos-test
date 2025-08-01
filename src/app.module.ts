import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/db.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductsModule } from './products/products.module';
import { AttributesModule } from './attributes/attribute.module';
import { AttributeTypesModule } from './attributes/attributeTypes.module';
import { ProductVariantsModule } from './product_variants/product_variants.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoriesModule,
    SubcategoriesModule,
    ProductsModule,
    AttributesModule,
    AttributeTypesModule,
    ProductVariantsModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
