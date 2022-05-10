import { createUnionType } from '@nestjs/graphql';
import { Country } from '../../countries/models/country.model';
import { Continent } from '../../continents/models/continent.model';
import { State } from '../../states/models/state.model';
import { Sprite } from '../../sprites/models/sprite.model';
import { Resource } from '../../resources/model/resource.model';

export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () => [Country, Continent, Resource, Sprite, State] as const,
  resolveType(value) {
    return value.constructor.name;
  },
});
