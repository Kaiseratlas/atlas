import { Resolver } from '@nestjs/graphql';
import { StrategicRegion } from '../models/strategic-region.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { InjectParser } from '../../parser/parser.module';
import type Parser from '@kaiseratlas/parser';

@Resolver(() => StrategicRegion)
export class StrategicRegionsResolver extends ProductEntitiesResolver(
  StrategicRegion,
  {
    plural: 'strategicRegions',
  },
) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.map.strategicRegions);
  }
}
