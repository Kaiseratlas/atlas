import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Focus } from '../models/focus.model';
import { Request } from 'express';
import { ParserService } from '../../parser';
import { SpritesService } from '../../sprites/services/sprites.service';

@Resolver(() => Focus)
export class FocusesResolver extends ProductEntitiesResolver(Focus, {
  plural: 'focuses',
}) {
  constructor(
    private readonly parserService: ParserService,
    private readonly spritesService: SpritesService,
  ) {
    super(parserService);
  }

  @ResolveField(() => [Focus], { name: 'prerequisite' })
  getPrerequisite(@Parent() focus: Focus) {
    return focus.prerequisiteFocuses;
  }

  @ResolveField(() => Focus, { name: 'relativePositionFocus', nullable: true })
  getRelativePositionFocus(@Parent() focus: Focus) {
    return focus.relativePositionFocus;
  }

  @ResolveField(() => Focus, { name: 'mutuallyExclusiveFocus', nullable: true })
  getMutuallyExclusiveFocus(@Parent() focus: Focus) {
    return focus.mutuallyExclusiveFocus;
  }

  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() focus: Focus) {
    const l = await focus.getName();
    return l?.value;
  }
  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() focus: Focus) {
    const l = await focus.getDescription();
    return l?.value;
  }
  @ResolveField(() => String, { name: 'iconUrl' })
  async getIconUrl(@Context('req') req: Request, @Parent() focus: Focus) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    const icon = await focus.getIcon();
    return this.spritesService.getUrl(productName, productVersion, icon);
  }

  @ResolveField(() => [Focus.Filter], { name: 'searchFilters' })
  getSearchFilters(@Parent() focus: Focus) {
    return focus.searchFilters;
  }
}
