import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Event } from '../models/event.model';
import { EventsService } from '../services/events.service';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private modsService: ModsService,
  ) {}

  @Query(() => Event, { name: 'event' })
  async getEvent(@Args('id') eventId: string): Promise<Event> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.eventsService.findById(eventId, mod);
  }
}
