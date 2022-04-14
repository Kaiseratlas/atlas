import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Continent } from './continent.model';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';

@Resolver(() => Continent)
export class ContinentsResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Continent], { name: 'continents' })
  getContinents() {
    return this.parser.map.continents.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() continent: Continent) {
    // @ts-ignore
    const localisation = await continent.getName();
    if (!localisation) {
      return continent['name'];
    }
    return localisation.value;
  }
}
