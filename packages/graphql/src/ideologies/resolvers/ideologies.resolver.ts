import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ideology } from '../models/ideology.model';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { SpritesService } from '../../sprites/services/sprites.service';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Ideology)
export class IdeologiesResolver extends ProductEntitiesResolver(Ideology, {
  plural: 'ideologies',
}) {
  constructor(
    @InjectParser() protected parser: Parser,
    private readonly spritesService: SpritesService,
  ) {
    super(parser.common.ideologies);
  }

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
