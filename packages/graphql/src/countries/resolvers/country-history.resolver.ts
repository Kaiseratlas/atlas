import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryHistory } from '../models/country-history.model';
import { StatesService } from '../../states/services/states.service';
import { ModsService } from '../../mods/services/mods.service';
import { CountryLeadersService } from '../services';
import {
  CountryPopularity,
  CountryFieldMarshal,
  CountryLeader,
  CountryNavyLeader,
  CountryCorpsCommander,
} from '../models';

@Resolver(() => CountryHistory)
export class CountryHistoryResolver {
  constructor(
    private statesService: StatesService,
    private countryLeadersService: CountryLeadersService,
    private modsService: ModsService,
  ) {}

  @ResolveField(() => [CountryPopularity], { name: 'popularities' })
  async getPopularities(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['popularities']> {
    return countryHistory.popularities;
  }

  @ResolveField(() => [CountryFieldMarshal], { name: 'fieldMarshals' })
  async getFieldMarshals(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['fieldMarshals']> {
    return countryHistory.fieldMarshals;
  }

  @ResolveField(() => [CountryCorpsCommander], { name: 'corpsCommanders' })
  async getCorpsCommanders(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['corpsCommanders']> {
    return countryHistory.corpsCommanders;
  }

  @ResolveField(() => [CountryNavyLeader], { name: 'navyLeaders' })
  async getNavyLeaders(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['navyLeaders']> {
    return countryHistory.navyLeaders;
  }

  @ResolveField()
  async capital(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['capital']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.statesService.findById(countryHistory.capitalId, mod);
  }

  @ResolveField(() => [CountryLeader], { name: 'leaders' })
  async getLeaders(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['leaders']> {
    return countryHistory.leaders;
  }
}
