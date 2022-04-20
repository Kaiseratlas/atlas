import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { InjectParser } from '../../parser/parser.module';
import type Parser from '@kaiseratlas/parser';
import { Resource } from '../model/resource.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Resource)
export class ResourcesResolver extends ProductEntitiesResolver(Resource, {
  plural: 'resources',
}) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.common.resources);
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() resource: Resource) {
    const localisation = await resource.getName();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() resource: Resource) {
    const localisation = await resource.getDescription();
    return localisation.value;
  }
}
