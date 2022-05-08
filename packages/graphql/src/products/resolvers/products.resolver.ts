import { Args, ID, ObjectType, Resolver } from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { Query } from '@nestjs/graphql';
import { IEdgeType, Paginated } from '../../shared/paginatied.function';
import { PaginationArgs } from '../../shared/dto/pagination.args';
import { ProductsService } from '../services/products.service';
import { PageInfo } from '../../shared/models/page-info.model';

@ObjectType()
class PaginatedProduct extends Paginated(Product) {}

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  protected transformToEdge(product: Product): IEdgeType<Product> {
    const cursor = Buffer.from(product.id).toString('base64');
    return {
      node: product,
      cursor,
    };
  }

  @Query(() => Product, { name: 'product' })
  getProduct(@Args('id', { type: () => ID }) id: Product['alias']) {
    return this.productsService.findByAlias(id);
  }

  @Query(() => PaginatedProduct, { name: 'products' })
  async getProducts(@Args() paginationArgs: PaginationArgs) {
    const { data, cursor } = await this.productsService.paginate(
      paginationArgs,
    );
    const pageInfo = new PageInfo({
      startCursor: null,
      endCursor: null,
      hasNextPage: !!cursor.afterCursor,
      hasPreviousPage: !!cursor.beforeCursor,
    });
    const edges = data.map(this.transformToEdge);
    return {
      pageInfo,
      edges,
    };
  }
}
