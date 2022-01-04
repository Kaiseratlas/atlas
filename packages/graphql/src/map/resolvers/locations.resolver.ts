import { Query, Resolver } from '@nestjs/graphql';
import { MapsService } from '../services/maps.service';
import { ModsService } from '../../mods/services/mods.service';
import { Location } from '../models/location.model';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(
    private mapsService: MapsService,
    private modsService: ModsService,
  ) {}

  @Query(() => [Location], { name: 'locations' })
  async getLocations() {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const locations = await this.mapsService.test(mod);
    return locations;
  }
}
