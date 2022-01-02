import { Query, Resolver } from '@nestjs/graphql';
import { ModsService } from '../services/mods.service';
import { Release } from '../models/release.model';

@Resolver(() => Release)
export class ReleasesResolver {
  constructor(private modsService: ModsService) {}

  @Query(() => [Release], { name: 'releases' })
  async getReleases(): Promise<Release[]> {
    const mods = await this.modsService.findAllByRemoteId(1521695605);
    return mods
      .map<Release>((mod) => ({
        version: mod.version,
      }))
      .sort((a, b) => b.version.localeCompare(a.version));
  }
}
