import { Injectable } from '@nestjs/common';
import type { Product } from '../../products/models/product.model';
import type { ProductVersion } from '../../products/models/product-version.model';
import type Parser from '@kaiseratlas/parser';

type ParserMap = Map<Product['alias'], Map<ProductVersion['version'], Parser>>;

@Injectable()
export class ParserService {
  private readonly parserMap: ParserMap = new Map();

  getAll(): Parser[] {
    return [...this.parserMap.values()].flatMap((versionMap) => [
      ...versionMap.values(),
    ]);
  }

  get(productAlias: Product['alias'], version: ProductVersion['version']) {
    return this.parserMap.get(productAlias).get(version);
  }

  add(
    productAlias: Product['alias'],
    version: ProductVersion['version'],
    parser: Parser,
  ) {
    if (!this.parserMap.has(productAlias)) {
      this.parserMap.set(productAlias, new Map());
    }
    const versionMap = this.parserMap.get(productAlias);
    versionMap.set(version, parser);
  }
}
