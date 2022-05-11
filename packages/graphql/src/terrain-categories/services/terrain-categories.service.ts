import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { TerrainCategory } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class TerrainCategoriesService extends ProductEntitiesService(
  TerrainCategory,
) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'terrain_categories';
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

  protected async transform(terrainCategory: TerrainCategory) {
    const [name, description] = await Promise.all([
      terrainCategory.getName(),
      terrainCategory.getDescription(),
    ]);
    return {
      id: terrainCategory.id,
      name: name?.value,
      description: description?.value,
    };
  }
}
