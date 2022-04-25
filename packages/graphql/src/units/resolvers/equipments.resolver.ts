import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Unit } from '../models/unit.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import type { Equipment } from '../models/equipment.model';

@Resolver(() => Unit.Equipment)
export class EquipmentsResolver extends ProductEntitiesResolver(
  Unit.Equipment,
  {
    plural: 'equipments',
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() equipment: Equipment) {
    const localisation = await equipment.getName();
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() equipment: Equipment) {
    const localisation = await equipment.getDescription();
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'shortName', nullable: true })
  async getShortName(@Parent() equipment: Equipment) {
    const localisation = await equipment.getShortName();
    return localisation?.value;
  }
}
