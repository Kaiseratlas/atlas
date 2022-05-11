import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { GameRule } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class GameRulesService extends ProductEntitiesService(GameRule) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'game_rules';
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

  protected async transform(gameRule: GameRule): Promise<any> {
    const name = await gameRule.getName();
    return {
      id: gameRule.id,
      name: name.value,
    };
  }
}
