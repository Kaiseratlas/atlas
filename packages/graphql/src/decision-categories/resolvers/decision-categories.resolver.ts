import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DecisionCategory } from '../models/decision-category.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => DecisionCategory)
export class DecisionCategoriesResolver extends ProductEntitiesResolver(
  DecisionCategory,
  {
    plural: 'decisionCategories',
  },
) {
  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() decisionCategory: DecisionCategory) {
    const localisation = await decisionCategory.getName();
    return localisation?.value;
  }
}
