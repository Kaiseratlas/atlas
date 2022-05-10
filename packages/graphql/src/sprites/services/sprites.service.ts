import { Injectable } from '@nestjs/common';
import { Sprite } from '../models/sprite.model';
import type { ProductVersion } from '../../products/models/product-version.model';
import { Product } from '../../products/models/product.model';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SpritesService extends ProductEntitiesService(Sprite) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'sprites';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  protected transform(sprite: Sprite) {
    return {
      id: sprite.id,
    };
  }

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
