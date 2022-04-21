import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TerrainCategory } from '../models/terrain-category.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => TerrainCategory)
export class TerrainCategoriesResolver extends ProductEntitiesResolver(
  TerrainCategory,
  {
    plural: 'terrainCategories',
  },
) {
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
