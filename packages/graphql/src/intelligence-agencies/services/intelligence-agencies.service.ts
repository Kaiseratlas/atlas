import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { IntelligenceAgency as IA } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class IntelligenceAgenciesService extends ProductEntitiesService(IA) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'intelligence_agencies';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      names: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  protected transform(ia: IA) {
    return {
      id: ia['picture'],
      names: ia.names,
    };
  }
}
