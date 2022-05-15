import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Sprite } from '../models/sprite.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { ParserService } from '../../parser';
import { SpritesService } from '../services/sprites.service';
import { Request } from 'express';

@Resolver(() => Sprite)
export class SpritesResolver extends ProductEntitiesResolver(Sprite, {
  plural: 'sprites',
}) {
  constructor(
    private readonly parserService: ParserService,
    private readonly spritesService: SpritesService,
  ) {
    super();
  }

  @ResolveField(() => String, { name: 'previewUrl' })
  getPreviewUrl(@Context('req') req: Request, @Parent() sprite: Sprite) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    return this.spritesService.getUrl(productName, productVersion, sprite);
  }
}
