import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from '../services/search.service';
import { SearchResultUnion } from '../unions/search-result.union';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [SearchResultUnion], { name: 'search' })
  async getSearchResults(@Args('term', { type: () => String }) term: string) {
    return this.searchService.search(term);
  }
}
