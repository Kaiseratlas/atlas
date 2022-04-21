import { Injectable } from '@nestjs/common';
import type { CountryFlag } from '../models/country-flag.model';
import type { Product } from '../../products/models/product.model';
import type { ProductVersion } from '../../products/models/product-version.model';

@Injectable()
export class CountryFlagsService {
  getUrl(
    productAlias: Product['alias'],
    productVersion: ProductVersion['version'],
    countryFlag: CountryFlag,
  ): string {
    const flagUrl = new URL(
      `${productAlias}/${productVersion}/gfx/flags/${countryFlag.id}`,
      'http://localhost:3000',
    );
    return flagUrl.toString();
  }
}
