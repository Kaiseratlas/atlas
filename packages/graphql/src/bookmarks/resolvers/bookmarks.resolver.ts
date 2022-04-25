import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Bookmark } from '../models/bookmark.model';

@Resolver(() => Bookmark)
export class BookmarksResolver extends ProductEntitiesResolver(Bookmark, {
  plural: 'bookmarks',
}) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() bookmark: Bookmark) {
    const localisation = await bookmark.getName();
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() bookmark: Bookmark) {
    const localisation = await bookmark.getDescription();
    return localisation.value;
  }
}
