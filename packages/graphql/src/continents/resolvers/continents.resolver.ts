import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Continent } from '../models/continent.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Continent)
export class ContinentsResolver extends ProductEntitiesResolver(Continent, {
  plural: 'continents',
}) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() continent: Continent) {
    const localisation = await continent.getName();
    if (!localisation) {
      return continent['name'];
    }
    return localisation.value;
  }
}
