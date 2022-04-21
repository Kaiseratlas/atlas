import { Resolver } from '@nestjs/graphql';
import { AutonomyState } from '../models/autonomy-state.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => AutonomyState)
export class AutonomousStatesResolver extends ProductEntitiesResolver(
  AutonomyState,
  {
    plural: 'autonomousStates',
  },
) {}
