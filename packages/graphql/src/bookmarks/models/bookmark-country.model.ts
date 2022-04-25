import * as Parser from '@kaiseratlas/parser';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookmarkCountry extends Parser.Bookmark.Country {
  @Field()
  readonly isMinor: boolean;
}
