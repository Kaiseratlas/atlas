import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { StateCategory } from '../models/state-category.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => StateCategory)
export class StateCategoriesResolver extends ProductEntitiesResolver(
  StateCategory,
  {
    plural: 'stateCategories',
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() stateCategory: StateCategory) {
    const localisation = await stateCategory.getName();
    return localisation.value;
  }
}
