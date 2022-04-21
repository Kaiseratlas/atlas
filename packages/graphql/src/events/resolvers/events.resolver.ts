import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Event } from '../event.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Event)
export class EventsResolver extends ProductEntitiesResolver(Event, {
  plural: 'events',
}) {
  @ResolveField(() => String, { name: 'title' })
  async getTitle(@Parent() event: Event) {
    const localisation = await event.getTitle();
    if (!localisation) {
      return event.id;
    }
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() event: Event) {
    const localisation = await event.getDescription();
    if (!localisation) {
      return event.id;
    }
    return localisation.value;
  }
}
