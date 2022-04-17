import { Query, ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { Resource } from '../model/resource.model';

@Resolver(() => Resource)
export class ResourcesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Resource], { name: 'resources' })
  getResources(): Promise<Resource[]> {
    return this.parser.common.resources.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() resource: Resource) {
    const localisation = await resource.getName();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(@Parent() resource: Resource) {
    const localisation = await resource.getDescription();
    return localisation.value;;
  }
}
