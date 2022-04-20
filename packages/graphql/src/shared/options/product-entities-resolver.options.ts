import type { ProductEntity } from '@kaiseratlas/parser';

export interface ProductEntitiesResolverOptions<T extends ProductEntity> {
  readonly getIdProperty?: (entity: T) => string | number;
  readonly plural: string;
}
