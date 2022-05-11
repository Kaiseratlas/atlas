import { Module } from '@nestjs/common';
import { BookmarksService } from './services/bookmarks.service';
import * as resolvers from './resolvers';

@Module({
  providers: [...Object.values(resolvers), BookmarksService],
  exports: [BookmarksService],
})
export class BookmarksModule {}
