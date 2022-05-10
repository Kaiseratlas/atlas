import { Module } from '@nestjs/common';
import { TerrainCategoriesResolver } from './resolvers/terrain-categories.resolver';
import { TerrainCategoriesService } from './services/terrain-categories.service';

@Module({
  providers: [TerrainCategoriesResolver, TerrainCategoriesService],
  exports: [TerrainCategoriesService],
})
export class TerrainCategoriesModule {}
