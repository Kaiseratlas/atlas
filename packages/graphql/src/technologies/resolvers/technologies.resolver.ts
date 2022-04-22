import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Technology } from '../models/technology.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Technology)
export class TechnologiesResolver extends ProductEntitiesResolver(Technology, {
  plural: 'technologies',
}) {
  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() technology: Technology) {
    const localisation = await technology.getName();
    if (!localisation) {
      return null;
    }
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() technology: Technology) {
    const localisation = await technology.getDescription();
    if (!localisation) {
      return null;
    }
    return localisation.value;
  }

  @ResolveField(() => [Technology.Category], { name: 'categories' })
  async getCategories(@Parent() technology: Technology) {
    return technology.getCategories();
  }
}
