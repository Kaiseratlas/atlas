import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DifficultySetting } from '../models/difficulty-setting.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Country } from '../../countries/models/country.model';

@Resolver(() => DifficultySetting)
export class DifficultySettingsResolver extends ProductEntitiesResolver(
  DifficultySetting,
  {
    plural: 'difficultySettings',
    getIdProperty: (difficultySetting) => difficultySetting.key,
  },
) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() difficultySetting: DifficultySetting) {
    const localisation = await difficultySetting.getName();
    return localisation.value;
  }

  @ResolveField(() => [Country], { name: 'countries' })
  getCountries(@Parent() difficultySetting: DifficultySetting) {
    return difficultySetting.getCountries();
  }
}
