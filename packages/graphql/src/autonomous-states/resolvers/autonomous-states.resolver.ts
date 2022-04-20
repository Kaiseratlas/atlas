import { Resolver } from '@nestjs/graphql';
import { AutonomyState } from '../models/autonomy-state.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { InjectParser } from '../../parser/parser.module';
import type Parser from '@kaiseratlas/parser';

@Resolver(() => AutonomyState)
export class AutonomousStatesResolver extends ProductEntitiesResolver(
  AutonomyState,
  {
    plural: 'autonomousStates',
  },
) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.common.autonomousStates);
  }
}
