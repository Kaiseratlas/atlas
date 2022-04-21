import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ability } from '../models/ability.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Ability)
export class AbilitiesResolver extends ProductEntitiesResolver(Ability, {
  plural: 'abilities',
}) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() ability: Ability) {
    const localisation = await ability.getName();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() ability: Ability) {
    const localisation = await ability.getDescription();
    return localisation.value;
  }
}
