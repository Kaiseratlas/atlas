import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { State } from '../models';
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

  @Query(() => [State], { name: 'states' })
  async getStates(): Promise<State[]> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.statesService.findAll(mod);
  }

  @ResolveField(() => [ID])
  provinces(@Parent() { provinces }: State) {
    return provinces.map((p) => p.provinceId);
  }

  @ResolveField()
  async name(@Parent() { name }: State): Promise<State['name']> {
    return this.i18n.t(`common.${name}`);
  }
}
