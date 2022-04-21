import { Resolver } from '@nestjs/graphql';
import { StrategicRegion } from '../models/strategic-region.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => StrategicRegion)
export class StrategicRegionsResolver extends ProductEntitiesResolver(
  StrategicRegion,
  {
    plural: 'strategicRegions',
    getManager: (parser) => parser.map.strategicRegions,
  },
) {}
