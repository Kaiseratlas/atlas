import type { Product } from '../../products/models/product.model';
import type { ProductVersion } from '../../products/models/product-version.model';
import type { ProductEntity } from '@kaiseratlas/parser';
import type { OnApplicationBootstrap, Type } from '@nestjs/common';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export function ProductEntitiesService<T extends ProductEntity>(
  classRef: Type<T>,
) {
  abstract class BaseServiceHost implements OnApplicationBootstrap {
    protected constructor(
      protected readonly parserService: ParserService,
      protected readonly elasticsearchService: ElasticsearchService,
    ) {}

    protected abstract readonly index: string;
    protected abstract readonly mappings: Record<string, any>;
    protected abstract transform(entity: T): any | Promise<any>;

    async onApplicationBootstrap() {
      const isIndexExists = await this.elasticsearchService.indices.exists({
        index: this.index,
      });
      if (!isIndexExists) {
        await this.createIndex();
      }
      await this.bulk('kaiserreich', '0.20.1');
    }

    async createIndex() {
      await this.elasticsearchService.indices.create({
        index: this.index,
        mappings: this.mappings,
      });
    }

    async bulk(
      productAlias: Product['alias'],
      version: ProductVersion['version'],
    ): Promise<any> {
      const entities = await this.findAll(productAlias, version);
      const dataset = await Promise.all(
        entities.map<any>(async (entity) => ({
          ...(await this.transform(entity)),
          product: {
            name: productAlias,
            version,
          },
        })),
      );
      const operations = dataset.flatMap((doc) => [
        {
          index: {
            _index: this.index,
            _id: `${productAlias}@${version}/${classRef.name.toLowerCase()}.${
              doc.id
            }`,
          },
        },
        doc,
      ]);
      return this.elasticsearchService.bulk({
        refresh: true,
        operations,
      });
    }

    findAll(
      productAlias: Product['alias'],
      version: ProductVersion['version'],
    ): Promise<T[]> {
      return this.parserService
        .get(productAlias, version)
        .getManager<T>(classRef)
        .load();
    }
  }

  return BaseServiceHost;
}
