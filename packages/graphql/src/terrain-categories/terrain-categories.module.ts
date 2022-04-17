import { Module } from '@nestjs/common';
import { TerrainCategoriesResolver } from './resolvers/terrain-categories.resolver';

@Module({
  providers: [TerrainCategoriesResolver],
})
export class TerrainCategoriesModule {}
