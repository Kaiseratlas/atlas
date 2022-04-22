import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameRuleOption extends Parser.GameRule.Option {
  @Field(() => ID)
  readonly name: string;
  @Field()
  readonly allowAchievements: boolean;
}
