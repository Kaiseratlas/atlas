import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { Decision } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class DecisionsService extends ProductEntitiesService(Decision) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'decisions';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      name: { type: 'text', copy_to: ['_all'] },
      description: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  protected async transform(decision: Decision): Promise<any> {
    // TODO: TypeError: decision.getName is not a function
    // const [name, description] = await Promise.all([
    //   decision.getName(),
    //   decision.getDescription(),
    // ]);
    return {
      id: decision.id,
      // name: name?.value,
      // description: description?.value,
    };
  }
}
