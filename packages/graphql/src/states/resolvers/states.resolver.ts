import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { State } from '../models/state.model';
import { StatesService } from '../services/states.service';
import { I18nService } from 'nestjs-i18n';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => State)
export class StatesResolver {
  constructor(
    private i18n: I18nService,
    private modsService: ModsService,
    private statesService: StatesService,
  ) {}

  @Query(() => State, { name: 'state' })
  async getState(@Args('id') id: number): Promise<State> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.statesService.findById(id, mod);
  }

  @ResolveField()
  async localizedName(
    @Parent() { name }: State,
  ): Promise<State['localizedName']> {
    return this.i18n.t(`common.${name}`);
  }
}
