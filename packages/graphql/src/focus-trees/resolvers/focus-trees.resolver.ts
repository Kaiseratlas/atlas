import { Resolver } from '@nestjs/graphql';
import { FocusTree } from '../models/focus-tree.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import type Parser from '@kaiseratlas/parser';
import { InjectParser } from '../../parser/parser.module';

@Resolver(() => FocusTree)
export class FocusTreesResolver extends ProductEntitiesResolver(FocusTree, {
  plural: 'focusTrees',
}) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.common.goals);
  }
}
