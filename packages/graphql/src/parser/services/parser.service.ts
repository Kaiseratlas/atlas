import { Injectable } from '@nestjs/common';
import type { Product } from '../../products/models/product.model';
import type { ProductVersion } from '../../products/models/product-version.model';
import Parser from '@kaiseratlas/parser';

type ParserMap = Map<Product['alias'], Map<ProductVersion['version'], Parser>>;

@Injectable()
export class ParserService {
  private readonly parserMap: ParserMap = new Map();

  create(product: Product, version: ProductVersion) {
    if (!this.parserMap.has(product.alias)) {
      this.parserMap.set(product.alias, new Map());
    }
    const versionMap = this.parserMap.get(product.alias);
    console.log('version', version);
    // Parser.initialize(product.)
    // versionMap.set(version.version, new)
  }
}
