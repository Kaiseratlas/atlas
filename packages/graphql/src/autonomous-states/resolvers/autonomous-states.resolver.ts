import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AutonomyState } from '../models/autonomy-state.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => AutonomyState)
export class AutonomousStatesResolver extends ProductEntitiesResolver(
  AutonomyState,
  {
    plural: 'autonomousStates',
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() autonomyState: AutonomyState) {
    const l = await autonomyState.getName();
    return l?.value;
  }
}
