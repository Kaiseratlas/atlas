import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TechnologyCategory } from '../models/technology-category.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => TechnologyCategory)
export class TechnologyCategoriesResolver extends ProductEntitiesResolver(
  TechnologyCategory,
  {
    plural: 'technologyCategories',
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() technologyCategory: TechnologyCategory) {
    const localisation = await technologyCategory.getName();
    return localisation.value;
  }
}
