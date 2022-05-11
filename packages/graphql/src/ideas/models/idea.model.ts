import * as Parser from '@kaiseratlas/parser';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IdeaCategory } from './idea-category.model';

@ObjectType()
export class Idea extends Parser.Idea {
  static readonly Category = IdeaCategory;
  @Field(() => ID)
  readonly id: string;
  @Field(() => Int, { nullable: true })
  readonly cost: number;
  @Field(() => Int, { nullable: true })
  readonly removalCost: number;
}
