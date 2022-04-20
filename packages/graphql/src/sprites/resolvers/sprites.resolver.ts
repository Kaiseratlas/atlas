import { Resolver } from '@nestjs/graphql';
import { Sprite } from '../models/sprite.model';
import { InjectParser } from '../../parser/parser.module';
import type Parser from '@kaiseratlas/parser';
import { ProductEntitiesResolver } from '../../shared/resolvers/product-entities.resolver';

@Resolver(() => Sprite)
export class SpritesResolver extends ProductEntitiesResolver(Sprite, {
  plural: 'sprites',
}) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.interface.sprites);
  }
}
