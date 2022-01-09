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
  CountryIdea,
  CountryEvent,
} from '../models';
import { IdeasService } from '../../ideas/services/ideas.service';
import { Idea } from '../../ideas/models/idea.model';

@Resolver(() => CountryHistory)
export class CountryHistoryResolver {
  constructor(
    private statesService: StatesService,
    private countryLeadersService: CountryLeadersService,
    private modsService: ModsService,
    private ideasService: IdeasService,
  ) {}

  @ResolveField(() => [Idea], { name: 'ideas' })
  async getIdeas(@Parent() countryHistory: CountryHistory) {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const countryIdeas = (await countryHistory.ideas) as CountryIdea[];
    return Promise.all(
      countryIdeas.map((countryIdea) =>
        this.ideasService.findByName(countryIdea.ideaName, mod),
      ),
    );
  }

  @ResolveField(() => [CountryEvent], { name: 'events' })
  async getEvents(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['events']> {
    return countryHistory.events;
  }

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
    const state = await this.statesService.findById(
      countryHistory.capitalId,
      mod,
    );
    const capital = state.history.capitalVictoryPoints;
    return capital;
  }

  @ResolveField(() => [CountryLeader], { name: 'leaders' })
  async getLeaders(
    @Parent() countryHistory: CountryHistory,
  ): Promise<CountryHistory['leaders']> {
    return countryHistory.leaders;
  }
}
