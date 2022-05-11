import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { StrategicRegion } from '../models/strategic-region.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => StrategicRegion)
export class StrategicRegionsResolver extends ProductEntitiesResolver(
  StrategicRegion,
  {
    plural: 'strategicRegions',
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() strategicRegion: StrategicRegion) {
    const localisation = await strategicRegion.getName();
    return localisation?.value;
  }
}
