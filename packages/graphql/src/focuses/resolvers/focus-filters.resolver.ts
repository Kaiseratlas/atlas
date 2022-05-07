import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Focus } from '../models/focus.model';
import type { FocusFilter } from '../models/focus-filter.model';

@Resolver(() => Focus.Filter)
export class FocusFiltersResolver {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() focusFilter: FocusFilter) {
    const l = await focusFilter.getName();
    return l?.value;
  }
}
