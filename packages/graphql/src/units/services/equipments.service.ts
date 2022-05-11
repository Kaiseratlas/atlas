import { Injectable } from '@nestjs/common';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { Unit } from '@kaiseratlas/parser';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Equipment } from '@kaiseratlas/parser/dist/common';

@Injectable()
export class EquipmentsService extends ProductEntitiesService(Unit.Equipment) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'equipments';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      name: { type: 'text', copy_to: ['_all'] },
      description: { type: 'text', copy_to: ['_all'] },
      short_name: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  protected async transform(equipment: Equipment): Promise<any> {
    const [name, description, shortName] = await Promise.all([
      equipment.getName(),
      equipment.getDescription(),
      equipment.getShortName(),
    ]);
    return {
      id: equipment.id,
      name: name?.value,
      description: description?.value,
      short_name: shortName?.value,
    };
  }
}
