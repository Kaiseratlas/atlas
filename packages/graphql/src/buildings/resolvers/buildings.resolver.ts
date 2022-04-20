import { Resolver } from '@nestjs/graphql';
import { Building } from '../models/building.model';
import { InjectParser } from '../../parser/parser.module';
import type Parser from '@kaiseratlas/parser';
import { ProductEntitiesResolver } from '../../shared/resolvers/product-entities.resolver';

@Resolver(() => Building)
export class BuildingsResolver extends ProductEntitiesResolver(Building, {
  plural: 'buildings',
}) {
  constructor(@InjectParser() private readonly parser: Parser) {
    super(parser.common.buildings);
  }
}
