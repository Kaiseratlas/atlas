import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { State, StateHistory } from '../models';

@Resolver(() => StateHistory)
export class StateHistoryResolver {
  @ResolveField(() => [String])
  claims(@Parent() { addClaimBy }: StateHistory) {
    return addClaimBy.map((stateClaim) => stateClaim.tag);
  }

  @ResolveField(() => [String])
  cores(@Parent() { addCoreOf }: StateHistory) {
    return addCoreOf.map((stateCore) => stateCore.tag);
  }
}
