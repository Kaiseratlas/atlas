import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryEvent } from '../models';
import { Event } from '../../events/models';
import { ModsService } from '../../mods/services/mods.service';
import { EventsService } from '../../events/services/events.service';

@Resolver(() => CountryEvent)
export class CountryEventsResolver {
  constructor(
    private modsService: ModsService,
    private eventsService: EventsService,
  ) {}

  @ResolveField(() => Event, { name: 'event' })
  async getEvent(
    @Parent() countryEvent: CountryEvent,
  ): Promise<CountryEvent['event']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const event = await this.eventsService.findById(countryEvent.eventId, mod);
    console.log('event', await event.titles)
    console.log('event', await event.descriptions)
    return event;
  }
}
