import type { Type } from '@nestjs/common';
import {
  Resolver,
  Query,
  ObjectType,
  Args,
  ID,
  Context,
} from '@nestjs/graphql';
import type { ProductEntity } from '@kaiseratlas/parser';
import { IEdgeType, Paginated } from '../paginatied.function';
import { PaginationArgs } from '../dto/pagination.args';
import { PageInfo } from '../models/page-info.model';
import type { ProductEntitiesResolverOptions } from '../options/product-entities-resolver.options';
import { camelize } from '../shared.utils';
import { ParserService } from '../../parser';
import type { Request } from 'express';

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
    async findById(
      @Context('req') req: Request,
      @Args('id', { type: () => ID }) id: T['id'],
    ): Promise<T> {
      const productName = req.get('x-product-name');
      const productVersion = req.get('x-product-version');
      const parser = this.parserService.get(productName, productVersion);
      const manager = parser.getManager<T>(classRef);
      return manager.get(id);
    }

    protected transformToEdge(entity: T): IEdgeType<T> {
      const id = options?.getIdProperty?.(entity) ?? entity['id'];
      const cursor = Buffer.from(`${id}`).toString('base64');
      return {
        node: entity,
        cursor,
      };
    }

    @Query(() => PaginatedEntity, { name: options.plural })
    async findAll(
      @Context('req') req: Request,
      @Args() { before, first, last, after }: PaginationArgs,
    ): Promise<PaginatedEntity> {
      if (!first && !last) {
        first = 10;
      }
      const productName = req.get('x-product-name');
      const productVersion = req.get('x-product-version');
      const parser = this.parserService.get(productName, productVersion);
      const manager = parser.getManager<T>(classRef);
      const entities = await manager.load();
      const edges = entities.map(this.transformToEdge);
      let slicedEdges = [];
      if (first) {
        const afterIndex = edges.findIndex((b) => b.cursor === after);
        slicedEdges = edges.slice(afterIndex + 1).slice(0, first);
      } else if (last) {
        const beforeIndex = edges.findIndex((b) => b.cursor === before);
        console.log('beforeIndex', beforeIndex);
        slicedEdges = edges
          .slice()
          .reverse()
          .slice(beforeIndex === -1 ? -beforeIndex - 1 : -beforeIndex)
          .slice(0, last)
          .reverse();
        console.log('slicedEdges', slicedEdges);
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
