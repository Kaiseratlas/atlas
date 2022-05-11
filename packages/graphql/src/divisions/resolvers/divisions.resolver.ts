import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Division } from '../models/division.model';
import { Province } from '../../provinces/models/province.model';

@Resolver(() => Division)
export class DivisionsResolver extends ProductEntitiesResolver(Division, {
  plural: 'divisions',
}) {
  // @Query(() => PaginatedDivision, { name: 'divisions' })
  // findAll() {
  //   return super.findAll();
  // }

  @ResolveField(() => Province, { name: 'location' })
  getLocation(@Parent() division: Division) {
    return division.getLocation();
  }
  @ResolveField(() => Division.Template, { name: 'template' })
  getTemplate(@Parent() division: Division) {
    return division.getTemplate();
  }
}
