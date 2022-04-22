import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Decision } from '../models/decision.model';
import { DecisionCategory } from '../models/decision-category.model';

@Resolver(() => Decision)
export class DecisionsResolver extends ProductEntitiesResolver(Decision, {
  plural: 'decisions',
}) {
  @ResolveField(() => DecisionCategory, { name: 'category' })
  getCategory(@Parent() decision: Decision): Promise<DecisionCategory> {
    return decision.getCategory();
  }

  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() decision: Decision) {
    const localisation = await decision.getName();
    return localisation?.value;
  }

  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() decision: Decision) {
    const localisation = await decision.getDescription();
    return localisation?.value;
  }
}
