import { Resolver } from '@nestjs/graphql';
import { Sprite } from '../models/sprite.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Sprite)
export class SpritesResolver extends ProductEntitiesResolver(Sprite, {
  plural: 'sprites',
}) {}
