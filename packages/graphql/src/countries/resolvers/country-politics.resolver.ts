import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryHistory } from '../entities/country-history.entity';
import { StatesService } from '../../states/services/states.service';
import { ModsService } from '../../mods/services/mods.service';
import { CountryPolitics } from '../entities/country-politics';
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
