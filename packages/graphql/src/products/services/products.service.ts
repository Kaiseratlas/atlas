import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product.model';
import { Repository } from 'typeorm';
import { buildPaginator, PagingQuery } from 'typeorm-cursor-pagination';
import { PaginationArgs } from '../../shared/dto/pagination.args';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async paginate({ before, first, last, after }: PaginationArgs) {
    const queryBuilder = this.repository.createQueryBuilder('product');
    const query: PagingQuery = { order: 'ASC' };
    query.limit = first ?? last;
    if (after) {
      query.afterCursor = after;
    }
    if (before) {
      query.beforeCursor = after;
    }
    const paginator = buildPaginator({ entity: Product, query });
    return paginator.paginate(queryBuilder);
  }

  findByAlias(alias: Product['alias']) {
    return this.repository.findOneOrFail({ alias });
  }
}
