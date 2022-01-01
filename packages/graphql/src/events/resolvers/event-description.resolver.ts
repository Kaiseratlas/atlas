import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EventDescription } from '../models';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => EventDescription)
export class EventDescriptionResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'text', nullable: true })
  getText(
    @Parent() eventText: EventDescription,
  ): Promise<EventDescription['text']> {
    console.log('eventText', eventText);
    return this.i18n.t(`common.${eventText.text}`);
  }
}
