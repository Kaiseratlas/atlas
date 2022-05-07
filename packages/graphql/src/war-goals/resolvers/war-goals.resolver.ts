import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { WarGoal } from '../models/war-goal.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => WarGoal)
export class WarGoalsResolver extends ProductEntitiesResolver(WarGoal, {
  plural: 'warGoals',
}) {
  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() warGoal: WarGoal) {
    const l = await warGoal.getName();
    return l?.value;
  }

  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() warGoal: WarGoal) {
    const l = await warGoal.getDescription();
    return l?.value;
  }

  @ResolveField(() => String, { name: 'shortDescription', nullable: true })
  async getShortDescription(@Parent() warGoal: WarGoal) {
    const l = await warGoal.getShortDescription();
    return l?.value;
  }
}
