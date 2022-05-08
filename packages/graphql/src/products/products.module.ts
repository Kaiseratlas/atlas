import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { GamesModule } from '../games/games.module';
import { ProductsResolver } from './resolvers/products.resolver';

@Module({
  imports: [GamesModule, TypeOrmModule.forFeature([Product, Product.Version])],
  providers: [ProductsService, ProductsResolver],
  exports: [GamesModule, ProductsService],
})
export class ProductsModule {}
