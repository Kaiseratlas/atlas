import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EventTitle } from '../models';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => EventTitle)
export class EventTitleResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'text', nullable: true })
  getText(@Parent() eventText: EventTitle): Promise<EventTitle['text']> {
    console.log('eventText', eventText)
    return this.i18n.t(`common.${eventText.text}`);
  }
}
