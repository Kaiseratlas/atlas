import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ParserService } from '../../parser';
import { Continent } from '@kaiseratlas/parser';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';

@Injectable()
export class ContinentsService extends ProductEntitiesService(Continent) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'continents';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      name: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  protected async transform(continent: Continent): Promise<any> {
    const name = await continent.getName();
    return {
      id: continent.id,
      name: name.value,
    };
  }
}
