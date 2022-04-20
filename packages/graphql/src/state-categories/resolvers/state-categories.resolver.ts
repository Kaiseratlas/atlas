import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StateCategory } from '../models/state-category.model';
import type Parser from '@kaiseratlas/parser';
import { InjectParser } from '../../parser/parser.module';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => StateCategory)
export class StateCategoriesResolver extends ProductEntitiesResolver(
  StateCategory,
  { plural: 'stateCategories' },
) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.common.stateCategories);
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() stateCategory: StateCategory) {
    const localisation = await stateCategory.getName();
    return localisation.value;
  }
}
