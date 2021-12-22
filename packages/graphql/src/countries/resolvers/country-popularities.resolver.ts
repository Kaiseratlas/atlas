import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryPopularity } from '../models';
import { Ideology } from '../../ideologies/models/ideology.model';
import { IdeologiesService } from '../../ideologies/services/ideologies.service';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => CountryPopularity)
export class CountryPopularitiesResolver {
  constructor(
    private ideologiesService: IdeologiesService,
    private modsService: ModsService,
  ) {}

  @ResolveField(() => Ideology, { name: 'ideology' })
  async getIdeology(@Parent() countryPopularity: CountryPopularity) {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.ideologiesService.findByName(
      countryPopularity.ideologyName,
      mod,
    );
  }
}
