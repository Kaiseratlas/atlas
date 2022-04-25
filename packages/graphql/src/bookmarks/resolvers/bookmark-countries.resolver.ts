import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Bookmark } from '../models/bookmark.model';
import type { BookmarkCountry } from '../models/bookmark-country.model';
import { Country } from '../../countries/models/country.model';
import { Ideology } from '../../ideologies/models/ideology.model';

@Resolver(() => Bookmark.Country)
export class BookmarkCountriesResolver {
  @ResolveField(() => String, { name: 'history' })
  async getName(@Parent() bookmarkCountry: BookmarkCountry) {
    const localisation = await bookmarkCountry.getHistory();
    return localisation.value;
  }
  @ResolveField(() => Country, { name: 'country' })
  getCountry(@Parent() bookmarkCountry: BookmarkCountry) {
    return bookmarkCountry.getCountry();
  }
  @ResolveField(() => Ideology, { name: 'ideology' })
  getIdeology(@Parent() bookmarkCountry: BookmarkCountry) {
    return bookmarkCountry.getIdeology();
  }
}
