import { Resolver } from '@nestjs/graphql';
import { Building } from '../models/building.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Building)
export class BuildingsResolver extends ProductEntitiesResolver(Building, {
  plural: 'buildings',
}) {}
