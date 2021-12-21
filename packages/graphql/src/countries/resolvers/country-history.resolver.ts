import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryHistory } from '../models/country-history.model';
import { StatesService } from '../../states/services/states.service';
import { ModsService } from '../../mods/services/mods.service';
import { CountryLeadersService } from '../services';

@Resolver(() => CountryHistory)
export class CountryHistoryResolver {
  constructor(
    private statesService: StatesService,
    private countryLeadersService: CountryLeadersService,
    private modsService: ModsService,
  ) {}

  @ResolveField()
  async capital(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['capital']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.statesService.findById(countryHistory.capitalId, mod);
  }

  @ResolveField()
  async leaders(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['leaders']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.countryLeadersService.findByCountryTag(countryHistory.tag, mod);
  }
}
