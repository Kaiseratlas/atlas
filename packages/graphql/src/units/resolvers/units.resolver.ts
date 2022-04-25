import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Unit } from '../models/unit.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Unit)
export class UnitsResolver extends ProductEntitiesResolver(Unit, {
  plural: 'units',
}) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() unit: Unit) {
    const localisation = await unit.getName();
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() unit: Unit) {
    const localisation = await unit.getDescription();
    return localisation?.value;
  }
  @ResolveField(() => Unit.Equipment, { name: 'transport', nullable: true })
  getTransport(@Parent() unit: Unit) {
    return unit.getTransport();
  }
  @ResolveField(() => [Unit.Equipment], { name: 'essentials', nullable: true })
  getEssentials(@Parent() unit: Unit) {
    return unit.getEssentials();
  }
  @ResolveField(() => [Unit.Equipment], { name: 'needs', nullable: true })
  getNeeds(@Parent() unit: Unit) {
    return unit.getNeeds();
  }
}
