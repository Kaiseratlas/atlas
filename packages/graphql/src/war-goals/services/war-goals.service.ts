import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { WarGoal } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class WarGoalsService extends ProductEntitiesService(WarGoal) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'war_goals';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      name: { type: 'text', copy_to: ['_all'] },
      description: { type: 'text', copy_to: ['_all'] },
      short_description: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  protected async transform(warGoal: WarGoal): Promise<any> {
    const [name, description, shortDescription] = await Promise.all([
      warGoal.getName(),
      warGoal.getDescription(),
      warGoal.getShortDescription(),
    ]);
    return {
      id: warGoal.id,
      name: name?.value,
      description: description?.value,
      short_description: shortDescription?.value,
    };
  }
}
