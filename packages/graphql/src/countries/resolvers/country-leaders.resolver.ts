import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { IdeologiesService } from '../../ideologies/services/ideologies.service';
import { CountryLeader } from '../models';
import { ModsService } from '../../mods/services/mods.service';
import { Ideology } from '../../ideologies/models/ideology.model';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => CountryLeader)
export class CountryLeadersResolver {
  constructor(
    private i18n: I18nService,
    private modsService: ModsService,
    private ideologiesService: IdeologiesService,
  ) {}

  @ResolveField(() => Ideology, { name: 'ideology' })
  async getCountryLeaderIdeology(
    @Parent() countryLeader: CountryLeader,
  ): Promise<CountryLeader['ideology']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.ideologiesService.findByName(countryLeader.ideologyName, mod);
  }

  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(
    @Parent() countryLeader: CountryLeader,
  ): Promise<CountryLeader['description']> {
    if (!countryLeader.description) {
      return null;
    }
    return this.i18n.t(`common.${countryLeader.description}`);
  }

  @ResolveField(() => String, { name: 'pictureUrl' })
  getPictureUrl(
    @Parent() countryLeader: CountryLeader,
  ): CountryLeader['pictureUrl'] {
    return `${process.env.HOST}/static/gfx/leaders/${countryLeader.pictureHash}.png`;
  }
}
