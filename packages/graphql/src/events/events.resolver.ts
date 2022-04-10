import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { Event } from './event.module';
import { InjectParser } from '../parser/parser.module';
import type Parser from '@kaiseratlas/parser';

@Resolver(() => Event)
export class EventsResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Event], { name: 'events' })
  getEvents() {
    return this.parser.events.load();
  }

  @ResolveField(() => String, { name: 'title' })
  async getTitle(@Parent() event: Event) {
    // @ts-ignore
    const localisation = await event.getTitle();
    if (!localisation) {
      return event.id;
    }
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() event: Event) {
    // @ts-ignore
    const localisation = await event.getDescription();
    if (!localisation) {
      return event.id;
    }
    return localisation.value;
  }
}
