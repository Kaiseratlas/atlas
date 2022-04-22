import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GameRuleGroup } from './game-rule-group.model';
import { GameRuleOption } from './game-rule-option.model';

@ObjectType()
export class GameRule extends Parser.GameRule {
  static readonly Group = GameRuleGroup;
  static readonly Option = GameRuleOption;

  @Field(() => ID)
  readonly id: string;
  @Field(() => GameRuleGroup)
  readonly group: GameRuleGroup;
  @Field(() => [GameRuleOption])
  readonly options: GameRuleOption[];
}
