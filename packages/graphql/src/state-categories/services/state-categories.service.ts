import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { StateCategory } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class StateCategoriesService extends ProductEntitiesService(
  StateCategory,
) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'state_categories';
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

  protected async transform(stateCategory: StateCategory): Promise<any> {
    const name = await stateCategory.getName();
    return {
      id: stateCategory.id,
      name: name?.value,
    };
  }
}
