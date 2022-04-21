import type { Type } from '@nestjs/common';
import { Resolver, Query, ObjectType, Args, ID } from '@nestjs/graphql';
import type { ProductEntity } from '@kaiseratlas/parser';
import { IEdgeType, Paginated } from '../paginatied.function';
import { PaginationArgs } from '../dto/pagination.args';
import { PageInfo } from '../models/page-info.model';
import type { ProductEntitiesResolverOptions } from '../options/product-entities-resolver.options';
import { camelize } from '../shared.utils';
import { ParserService } from '../../parser/services/parser.service';

export function ProductEntitiesResolver<T extends ProductEntity>(
  classRef: Type<T>,
  options: ProductEntitiesResolverOptions<T>,
): any {
  @ObjectType(`Paginated${classRef.name}`)
  class PaginatedEntity extends Paginated(classRef) {}

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected constructor(private readonly parserService: ParserService) {}

    @Query(() => classRef, { name: camelize(classRef.name) })
    async findById(@Args('id', { type: () => ID }) id: T['id']): Promise<T> {
      const parser = this.parserService.get('kaiserreich', '0.20.1');
      const manager = options.getManager(parser);
      return manager.get(id);
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
      const parser = this.parserService.get('kaiserreich', '0.20.1');
      const manager = options.getManager(parser);
      const entities = await manager.load();
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
