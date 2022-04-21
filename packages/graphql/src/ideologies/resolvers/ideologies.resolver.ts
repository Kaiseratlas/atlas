import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ideology } from '../models/ideology.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Ideology)
export class IdeologiesResolver extends ProductEntitiesResolver(Ideology, {
  plural: 'ideologies',
}) {
  @ResolveField(() => String, { name: 'icon' })
  async getIcon(@Parent() ideology: Ideology) {
    const icon = await ideology.getIcon();
    return this.spritesService.getUrl(icon);
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() ideology: Ideology) {
    const localisation = await ideology.getName();
    if (!localisation) {
      return ideology.name;
    }
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'grouping' })
  async getGrouping(@Parent() ideology: Ideology) {
    const localisation = await ideology.getGrouping();
    if (!localisation) {
      return ideology.grouping;
    }
    return localisation.value;
  }

  // @ResolveField(() => String, { name: 'description' })
  // getDescription(@Parent() ideology: Ideology) {
  //   // @ts-ignore
  //   const localisation = await country.getCurrentName();
  //   if (!localisation) {
  //     return ideology.name;
  //   }
  //   return localisation.value;
  // }
}
