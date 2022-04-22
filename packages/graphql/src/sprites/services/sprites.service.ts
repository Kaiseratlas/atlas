import { Injectable } from '@nestjs/common';
import { Sprite } from '../models/sprite.model';
import type { ProductVersion } from '../../products/models/product-version.model';
import { Product } from '../../products/models/product.model';

@Injectable()
export class SpritesService {
  getUrl(
    productAlias: Product['alias'],
    productVersion: ProductVersion['version'],
    sprite: Sprite,
  ): string {
    const flagUrl = new URL(
      `${productAlias}/${productVersion}/gfx/sprites/${sprite.id}`,
      'http://localhost:3000',
    );
    return flagUrl.toString();
  }
}
