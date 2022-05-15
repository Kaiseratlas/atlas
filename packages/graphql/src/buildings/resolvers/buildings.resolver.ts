import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Building } from '../models/building.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Building)
export class BuildingsResolver extends ProductEntitiesResolver(Building, {
  plural: 'buildings',
}) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() building: Building) {
    const localisation = await building.getName();
    if (!localisation) {
      return building['id'];
    }
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() building: Building) {
    const localisation = await building.getDescription();
    if (!localisation) {
      return building['id'];
    }
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'plural' })
  async getPlural(@Parent() building: Building) {
    const localisation = await building.getPlural();
    if (!localisation) {
      return building['id'];
    }
    return localisation.value;
  }
}
