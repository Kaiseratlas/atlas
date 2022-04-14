import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ideology } from './ideology.model';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';

@Resolver(() => Ideology)
export class IdeologiesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Ideology], { name: 'ideologies' })
  getIdeologies() {
    return this.parser.common.ideologies.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() ideology: Ideology) {
    // @ts-ignore
    const localisation = await ideology.getName();
    if (!localisation) {
      return ideology.name;
    }
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'grouping' })
  async getGrouping(@Parent() ideology: Ideology) {
    // @ts-ignore
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
