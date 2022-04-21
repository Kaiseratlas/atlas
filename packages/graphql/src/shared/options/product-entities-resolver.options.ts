import type {
  default as Parser,
  ProductEntity,
  GenericManager,
} from '@kaiseratlas/parser';

export interface ProductEntitiesResolverOptions<T extends ProductEntity> {
  readonly getIdProperty?: (entity: T) => string | number;
  readonly getManager?: (entity: Parser) => GenericManager<T>;
  readonly plural: string;
}
