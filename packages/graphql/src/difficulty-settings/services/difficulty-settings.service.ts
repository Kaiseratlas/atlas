import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { DifficultySetting } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class DifficultySettingsService extends ProductEntitiesService(
  DifficultySetting,
) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'difficulty_settings';
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

  protected async transform(
    difficultySetting: DifficultySetting,
  ): Promise<any> {
    const name = await difficultySetting.getName();
    return {
      id: difficultySetting.key,
      name: name.value,
    };
  }
}
