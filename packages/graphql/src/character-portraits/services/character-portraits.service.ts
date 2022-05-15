import { Injectable } from '@nestjs/common';
import { Character } from '../../characters/models/character.model';
import { Product } from '../../products/models/product.model';
import { ProductVersion } from '../../products/models/product-version.model';

@Injectable()
export class CharacterPortraitsService {
  getUrl(
    productAlias: Product['alias'],
    productVersion: ProductVersion['version'],
    character: Character,
    type: string,
    size: string,
  ) {
    const flagUrl = new URL(
      `${productAlias}/${productVersion}/gfx/characters/${character.id}/${type}/${size}`,
      'http://localhost:3000',
    );
    return flagUrl.toString();
  }
}
