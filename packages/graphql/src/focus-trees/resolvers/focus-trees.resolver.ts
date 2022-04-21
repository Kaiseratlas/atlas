import { Resolver } from '@nestjs/graphql';
import { FocusTree } from '../models/focus-tree.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => FocusTree)
export class FocusTreesResolver extends ProductEntitiesResolver(FocusTree, {
  plural: 'focusTrees',
}) {}
