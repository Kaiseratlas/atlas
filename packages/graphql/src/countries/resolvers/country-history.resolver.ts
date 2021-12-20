import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryHistory } from '../entities/country-history.entity';
import { StatesService } from '../../states/services/states.service';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => CountryHistory)
export class CountryHistoryResolver {
  constructor(
    private statesService: StatesService,
    private modsService: ModsService,
  ) {}

  @ResolveField()
  async capital(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['capital']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.statesService.findById(countryHistory.capitalId, mod);
  }
}
