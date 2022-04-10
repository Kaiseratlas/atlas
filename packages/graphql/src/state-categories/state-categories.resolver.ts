import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StateCategory } from './state-category.model';
import type Parser from '@kaiseratlas/parser';
import { InjectParser } from '../parser/parser.module';

@Resolver(() => StateCategory)
export class StateCategoriesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [StateCategory], { name: 'stateCategories' })
  getStateCategories() {
    return this.parser.common.stateCategories.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() stateCategory: StateCategory) {
    // @ts-ignore
    const localisation = await stateCategory.getName();
    return localisation.value;
  }
}
