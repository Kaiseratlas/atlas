import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TerrainCategory } from '../models/terrain-category.model';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => TerrainCategory)
export class TerrainCategoriesResolver extends ProductEntitiesResolver(
  TerrainCategory,
  {
    plural: 'terrainCategories',
  },
) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.common.terrain.categories);
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
