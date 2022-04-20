import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [GamesModule, TypeOrmModule.forFeature([Product, Product.Version])],
  providers: [ProductsService],
  exports: [GamesModule, ProductsService],
})
export class ProductsModule {}
