import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Idea } from '../models/idea.model';
import { Request } from 'express';
import { ParserService } from '../../parser';
import { SpritesService } from '../../sprites/services/sprites.service';

@Resolver(() => Idea)
export class IdeasResolver extends ProductEntitiesResolver(Idea, {
  plural: 'ideas',
}) {
  constructor(
    private readonly parserService: ParserService,
    private readonly spritesService: SpritesService,
  ) {
    super();
  }

  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() idea: Idea) {
    const l = await idea.getName();
    return l?.value;
  }
  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() idea: Idea) {
    const l = await idea.getDescription();
    return l?.value;
  }
  @ResolveField(() => String, { name: 'iconUrl', nullable: true })
  async getIcon(@Context('req') req: Request, @Parent() idea: Idea) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    const picture = await idea.getPicture();
    if (!picture) {
      return null;
    }
    return this.spritesService.getUrl(productName, productVersion, picture);
  }
}
