import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameRuleGroup extends Parser.GameRule.Group {
  @Field(() => ID)
  readonly id: string;
}
