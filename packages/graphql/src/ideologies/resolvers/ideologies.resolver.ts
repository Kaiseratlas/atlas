import { Query, Resolver } from '@nestjs/graphql';
import { Ideology } from '../models/ideology.model';
import { IdeologiesService } from '../services/ideologies.service';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => Ideology)
export class IdeologiesResolver {
  constructor(
    private modsService: ModsService,
    private ideologiesService: IdeologiesService
  ) {}

  @Query(() => [Ideology], { name: 'ideologies' })
  async getIdeologies(): Promise<Ideology[]> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.ideologiesService.find(mod);
  }
}
