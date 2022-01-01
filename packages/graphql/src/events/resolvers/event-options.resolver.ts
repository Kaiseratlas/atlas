import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';
import { EventOption } from '../models';

@Resolver(() => EventOption)
export class EventOptionsResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'name', nullable: true })
  getName(@Parent() eventOption: EventOption): Promise<EventOption['name']> {
    return this.i18n.t(`common.${eventOption.name}`);
  }
}
