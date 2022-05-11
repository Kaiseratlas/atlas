import * as Parser from '@kaiseratlas/parser';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdeaCategory extends Parser.Idea.Category {
  @Field(() => ID)
  readonly id: string;
  @Field(() => Int, { nullable: true })
  readonly cost: number;
  @Field(() => Int, { nullable: true })
  readonly removalCost: number;
}
