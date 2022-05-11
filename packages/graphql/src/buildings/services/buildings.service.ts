import { Injectable } from '@nestjs/common';
import { Building } from '@kaiseratlas/parser';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class BuildingsService extends ProductEntitiesService(Building) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'buildings';
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

  protected async transform(building: Building): Promise<any> {
    const [name, description] = await Promise.all([
      building.getName(),
      building.getDescription(),
    ]);
    return {
      id: building.id,
      name: name?.value,
      description: description?.value,
    };
  }
}
