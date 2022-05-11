import { Injectable } from '@nestjs/common';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { StrategicRegion } from '@kaiseratlas/parser';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';

@Injectable()
export class StrategicRegionsService extends ProductEntitiesService(
  StrategicRegion,
) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'strategic_regions';
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

  protected async transform(strategicRegion: StrategicRegion): Promise<any> {
    const name = await strategicRegion.getName();
    return {
      id: strategicRegion.id,
      name: name?.value,
    };
  }
}
