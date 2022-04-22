import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GameRule } from '../models/game-rule.model';
import { GameRuleGroup } from '../models/game-rule-group.model';

@Resolver(() => GameRule.Group)
export class GameRuleGroupsResolver {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() gameRuleGroup: GameRuleGroup) {
    const localisation = await gameRuleGroup.getName();
    return localisation.value;
  }
}
