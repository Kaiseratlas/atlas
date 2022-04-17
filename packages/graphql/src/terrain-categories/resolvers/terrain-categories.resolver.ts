import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TerrainCategory } from '../models/terrain-category.model';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';

@Resolver(() => TerrainCategory)
export class TerrainCategoriesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [TerrainCategory], { name: 'terrainCategories' })
  getTerrainCategories(): Promise<TerrainCategory[]> {
    return this.parser.common.terrain.categories.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() terrainCategory: TerrainCategory) {
    const localisation = await terrainCategory.getName();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() terrainCategory: TerrainCategory) {
    const localisation = await terrainCategory.getDescription();
    return localisation.value;
  }
}
