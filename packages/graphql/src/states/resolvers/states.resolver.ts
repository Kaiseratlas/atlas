import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { State } from '../models/state.model';
import { StateCategory } from '../../state-categories/models/state-category.model';
import { Country } from '../../countries/country.model';
import { Province } from '../../provinces/models/province.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => State)
export class StatesResolver extends ProductEntitiesResolver(State, {
  plural: 'states',
  getManager: (parser) => parser.history.states,
}) {
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
