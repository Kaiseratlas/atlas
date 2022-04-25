import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Unit } from '../models/unit.model';
import type { UnitGroup } from '../models/unit-group.model';

@Resolver(() => Unit.Group)
export class UnitGroupsResolver {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() unitGroup: UnitGroup) {
    const localisation = await unitGroup.getName();
    return localisation.value;
  }
}
