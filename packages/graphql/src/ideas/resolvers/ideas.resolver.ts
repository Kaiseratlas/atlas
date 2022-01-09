import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Idea } from '../models/idea.model';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => Idea)
export class IdeasResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => ID, { name: 'id' })
  getId(@Parent() idea: Idea) {
    return idea.name;
  }

  @ResolveField(() => String, { name: 'name' })
  getName(@Parent() idea: Idea) {
    return this.i18n.t(`common.${idea.name}`);
  }

  @ResolveField(() => String, { name: 'pictureUrl', nullable: true })
  getPortraitUrl(@Parent() idea: Idea): Idea['pictureUrl'] {
    if (!idea.picture) {
      return null;
    }
    return `${process.env.HOST}/static/gfx/ideas/${idea.pictureHash}.png`;
  }
}
