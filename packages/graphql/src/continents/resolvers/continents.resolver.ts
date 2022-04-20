import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Continent } from '../models/continent.model';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { ProductEntitiesResolver } from '../../shared/resolvers/product-entities.resolver';

@Resolver(() => Continent)
export class ContinentsResolver extends ProductEntitiesResolver(Continent, {
  plural: 'continents',
}) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.map.continents);
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() continent: Continent) {
    const localisation = await continent.getName();
    if (!localisation) {
      return continent['name'];
    }
    return localisation.value;
  }
}
