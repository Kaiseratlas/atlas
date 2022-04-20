import type { Type } from '@nestjs/common';
import { Resolver, Query, ObjectType, Args, ID } from '@nestjs/graphql';
import type { GenericManager, ProductEntity } from '@kaiseratlas/parser';
import { IEdgeType, Paginated } from '../paginatied.function';
import { PaginationArgs } from '../dto/pagination.args';
import { PageInfo } from '../models/page-info.model';
import type { ProductEntitiesResolverOptions } from '../options/product-entities-resolver.options';
import { camelize } from '../shared.utils';

export function ProductEntitiesResolver<T extends ProductEntity>(
  classRef: Type<T>,
  options: ProductEntitiesResolverOptions<T>,
): any {
  @ObjectType(`Paginated${classRef.name}`)
  class PaginatedEntity extends Paginated(classRef) {}

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected constructor(protected readonly manager: GenericManager<T>) {}

    @Query(() => classRef, { name: camelize(classRef.name) })
    async findById(@Args('id', { type: () => ID }) id: T['id']): Promise<T> {
      return this.manager.get(id);
    }

    protected transformToEdge(entity: T): IEdgeType<T> {
      const idProperty = options?.getIdProperty?.(entity) ?? 'id';
      return {
        node: entity,
        cursor: Buffer.from(`${entity[idProperty]}`).toString('base64'),
      };
    }

    @Query(() => PaginatedEntity, { name: options.plural })
    async findAll(
      @Args() { before, first, last, after }: PaginationArgs,
    ): Promise<PaginatedEntity> {
      const entities = await this.manager.load();
      const edges = entities.map(this.transformToEdge);
      let slicedEdges = [];
      if (first) {
        const afterIndex = edges.findIndex((b) => b.cursor === after);
        slicedEdges = edges.slice(afterIndex + 1).slice(0, first);
      } else if (last) {
        const beforeIndex = edges.findIndex((b) => b.cursor === before);
        slicedEdges = edges
          .slice()
          .reverse()
          .slice(beforeIndex === -1 ? -beforeIndex - 1 : -beforeIndex)
          .slice(0, last)
          .reverse();
      }

      const pageInfo = new PageInfo({
        startCursor: edges.length > 0 ? edges[0].cursor : null,
        endCursor: edges.length > 0 ? edges.slice(-1)[0].cursor : null,
        hasNextPage: true,
        hasPreviousPage: true,
      });

      return {
        pageInfo,
        edges: slicedEdges,
      };
    }
  }
  return BaseResolverHost;
}
