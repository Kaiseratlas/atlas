import { Query, Resolver } from '@nestjs/graphql';
import { Province } from '../models';
import { ProvincesService } from '../services/provinces.service';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => Province)
export class ProvincesResolver {
  constructor(
    private provincesService: ProvincesService,
    private modsService: ModsService,
  ) {}

  @Query(() => [Province], { name: 'provinces' })
  async getProvinces(): Promise<Province[]> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.provincesService.findAll(mod);
  }
}
