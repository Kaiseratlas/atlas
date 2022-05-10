import { Module } from '@nestjs/common';
import { SearchResolver } from './resolvers/search.resolver';
import { SearchService } from './services/search.service';

@Module({
  providers: [SearchResolver, SearchService]
})
export class SearchModule {}
