import { Query, Resolver } from '@nestjs/graphql';
import { Mod } from '../models/mod.model';
import { ModsService } from '../services/mods.service';

@Resolver(() => Mod)
export class ModsResolver {
  constructor(private modsService: ModsService) {}

  @Query(() => [Mod], { name: 'mods' })
  async getMods(): Promise<Mod[]> {
    return [];
  }
}
