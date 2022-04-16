import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Sprite } from '../models/sprite.model';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';

@Resolver(() => Sprite)
export class SpritesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => Sprite, { name: 'sprite' })
  getSprite(): Promise<Sprite> {
    return this.parser.interface.sprites.get('');
  }

  @Query(() => [Sprite], { name: 'sprites' })
  getSprites(): Promise<Sprite[]> {
    return this.parser.interface.sprites.load();
  }
}
