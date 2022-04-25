import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Unit } from '../models/unit.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import type { UnitCategory } from '../models/unit-category.model';

@Resolver(() => Unit.Category)
export class UnitCategoriesResolver extends ProductEntitiesResolver(
  Unit.Category,
  {
    plural: 'unitCategories',
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() unitCategory: UnitCategory) {
    const localisation = await unitCategory.getName();
    return localisation.value;
  }
}
