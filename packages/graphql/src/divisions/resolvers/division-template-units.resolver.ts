import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Division } from '../models/division.model';
import type { DivisionTemplateUnit } from '../models/division-template-unit.model';
import { Unit } from '../../units/models/unit.model';

@Resolver(() => Division.Template.Unit)
export class DivisionTemplateUnitsResolver {
  @ResolveField(() => Unit, { name: 'unit' })
  getUnit(@Parent() divisionTemplateUnit: DivisionTemplateUnit) {
    return divisionTemplateUnit.getUnit();
  }
}
