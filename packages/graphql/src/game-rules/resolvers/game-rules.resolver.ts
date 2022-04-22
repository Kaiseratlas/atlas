import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { GameRule } from '../models/game-rule.model';
import { ParserService } from '../../parser';
import { SpritesService } from '../../sprites/services/sprites.service';
import { Request } from 'express';

@Resolver(() => GameRule)
export class GameRulesResolver extends ProductEntitiesResolver(GameRule, {
  plural: 'gameRules',
}) {
  constructor(
    private readonly parserService: ParserService,
    private readonly spritesService: SpritesService,
  ) {
    super();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() gameRule: GameRule) {
    const localisation = await gameRule.getName();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'iconUrl' })
  async getIcon(@Context('req') req: Request, @Parent() gameRule: GameRule) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    const icon = await gameRule.getIcon();
    return this.spritesService.getUrl(productName, productVersion, icon);
  }
}
