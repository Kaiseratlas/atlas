import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { State } from './state.model';
import type Parser from '@kaiseratlas/parser';
import { InjectParser } from '../parser/parser.module';
import { StateCategory } from '../state-categories/state-category.model';
import { Country } from '../countries/country.model';
import { Province } from '../provinces/models/province.model';

@Resolver(() => State)
export class StatesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => State, { name: 'state' })
  async getState(@Args('id', { type: () => ID }) id: number) {
    return this.parser.history.states.get(+id);
  }

  @Query(() => [State], { name: 'states' })
  getStates() {
    return this.parser.history.states.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getCurrentName(@Parent() state: State) {
    const localisation = await state.getName();
    if (!localisation) {
      return state.id;
    }
    return localisation.value;
  }

  @ResolveField(() => StateCategory, { name: 'category' })
  async getCategory(@Parent() state: State) {
    return state.getCategory();
  }

  @ResolveField(() => [Province], { name: 'provinces' })
  async getProvinces(@Parent() state: State) {
    return state.getProvinces();
  }

  @ResolveField(() => Country, { name: 'controller' })
  async getController(@Parent() state: State) {
    return state.history.getController();
  }

  @ResolveField(() => [Country], { name: 'coreOf' })
  async getCoreCountries(@Parent() state: State) {
    return state.history.getCoreCountries();
  }
}
