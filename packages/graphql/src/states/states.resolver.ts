import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { State } from './state.model';
import type Parser from '@kaiseratlas/parser';
import { InjectParser } from '../parser/parser.module';
import {StateCategory} from "../state-categories/state-category.model";

@Resolver(() => State)
export class StatesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [State], { name: 'states' })
  async getStates() {
    const states = await this.parser.history.states.load();
    return states;
  }

  @ResolveField(() => String, { name: 'name' })
  async getCurrentName(@Parent() state: State) {
    // @ts-ignore
    const localisation = await state.getName();
    if (!localisation) {
      return state.id;
    }
    return localisation.value;
  }

  @ResolveField(() => StateCategory, { name: 'category' })
  async getCategory(@Parent() state: State) {
    // @ts-ignore
    return state.getCategory();
  }
}
