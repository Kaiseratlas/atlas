import * as Parser from '@kaiseratlas/parser';
import { Field, ObjectType } from '@nestjs/graphql';
import { BookmarkCountry } from './bookmark-country.model';

@ObjectType()
export class Bookmark extends Parser.Bookmark {
  static readonly Country = BookmarkCountry;

  @Field()
  readonly date: Date;
  @Field(() => [BookmarkCountry])
  readonly countries: BookmarkCountry[];
}
