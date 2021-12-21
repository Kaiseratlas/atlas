import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryHistory } from '../models/country-history.model';
import { StatesService } from '../../states/services/states.service';
import { ModsService } from '../../mods/services/mods.service';
import { CountryPolitics } from '../models/country-politics.model';
import { IdeologiesService } from '../../ideologies/services/ideologies.service';

@Resolver(() => CountryPolitics)
export class CountryPoliticsResolver {
  constructor(private ideologiesService: IdeologiesService) {}

  // @ResolveField()
  // async rulingParty(
  //   @Parent() countryPolitics: CountryPolitics,
  // ): Promise<CountryPolitics['rulingParty']> {
  //   const mod = await this.modsService.findByRemoteId(1521695605);
  //   return this.statesService.findById(countryHistory.capitalId, mod);
  // }
}
