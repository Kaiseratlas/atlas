import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Ideology } from '../models/ideology.model';
import { IdeologiesService } from '../services/ideologies.service';
import { ModsService } from '../../mods/services/mods.service';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => Ideology)
export class IdeologiesResolver {
  constructor(
    private i18n: I18nService,
    private modsService: ModsService,
    private ideologiesService: IdeologiesService,
  ) {}

  @Query(() => [Ideology], { name: 'ideologies' })
  async getIdeologies(): Promise<Ideology[]> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.ideologiesService.find(mod);
  }

  @ResolveField()
  id(@Parent() ideology: Ideology): Ideology['id'] {
    const { name } = ideology;
    return name;
  }

  @ResolveField()
  async name(@Parent() ideology: Ideology): Promise<Ideology['name']> {
    const { name } = ideology;
    return this.i18n.t(`common.${name}`);
  }

  @ResolveField()
  async grouping(@Parent() ideology: Ideology): Promise<Ideology['grouping']> {
    const { name } = ideology;
    return this.i18n.t(`common.${name}_desc`);
  }

  @ResolveField()
  async description(
    @Parent() ideology: Ideology,
  ): Promise<Ideology['description']> {
    const { name } = ideology;
    return this.i18n.t(`common.${name}_subtype_desc`);
  }
}
