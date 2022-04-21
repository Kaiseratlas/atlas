import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Province } from '../models/province.model';
import { Continent } from '../../continents/models/continent.model';
import { State } from '../../states/models/state.model';
import { TerrainCategory } from '../../terrain-categories/models/terrain-category.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Province)
export class ProvincesResolver extends ProductEntitiesResolver(Province, {
  plural: 'provinces',
}) {
  @ResolveField(() => Continent, { name: 'continent', nullable: true })
  async getContinent(@Parent() province: Province) {
    return province.getContinent();
  }

  @ResolveField(() => State, { name: 'state', nullable: true })
  async getState(@Parent() province: Province) {
    return province.getState();
  }

  @ResolveField(() => TerrainCategory, { name: 'terrainCategory' })
  async getTerrainCategory(@Parent() province: Province) {
    return province.getTerrainCategory();
  }
}
