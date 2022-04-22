import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GameRule } from '../models/game-rule.model';
import { GameRuleOption } from '../models/game-rule-option.model';

@Resolver(() => GameRule.Option)
export class GameRuleOptionsResolver {
  @ResolveField(() => String, { name: 'text' })
  async getText(@Parent() gameRuleOption: GameRuleOption) {
    const localisation = await gameRuleOption.getText();
    return localisation.value;
  }
  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() gameRuleOption: GameRuleOption) {
    const localisation = await gameRuleOption.getDescription();
    return localisation.value;
  }
}
