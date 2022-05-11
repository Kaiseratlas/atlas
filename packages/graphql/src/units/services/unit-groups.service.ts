// import { Injectable } from '@nestjs/common';
// import { ProductEntitiesService } from '../../shared/services/product-entities.service';
// import { Unit } from '@kaiseratlas/parser';
// import { ParserService } from '../../parser';
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { UnitGroup } from '@kaiseratlas/parser/dist/common';
//
// @Injectable()
// export class UnitGroupsService extends ProductEntitiesService(Unit.Group) {
//   constructor(
//     protected readonly parserService: ParserService,
//     protected readonly elasticsearchService: ElasticsearchService,
//   ) {
//     super(parserService, elasticsearchService);
//   }
//
//   protected readonly index = 'unit_groups';
//   protected readonly mappings = {
//     properties: {
//       id: { type: 'text', copy_to: ['_all'] },
//       name: { type: 'text', copy_to: ['_all'] },
//       product: {
//         type: 'object',
//       },
//       _all: {
//         type: 'text',
//       },
//     },
//   };
//
//   protected async transform(unitGroup: UnitGroup): Promise<any> {
//     const name = await unitGroup.getName();
//     return {
//       id: unitGroup.id,
//       name: name?.value,
//     };
//   }
// }
