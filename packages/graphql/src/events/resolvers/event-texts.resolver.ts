import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EventText } from '../models/event-text.model';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => EventText)
export class EventTextsResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'text', nullable: true })
  getText(@Parent() eventText: EventText): Promise<EventText['text']> {
    return this.i18n.t(`common.${eventText.text}`);
  }
}
