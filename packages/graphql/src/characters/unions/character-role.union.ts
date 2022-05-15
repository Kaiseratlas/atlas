import { createUnionType } from '@nestjs/graphql';
import { CountryLeader } from '../models/country-leader.model';
import { FieldMarshal } from '../models/field-marshal.class';
import { CorpsCommander } from '../models/corps-commander.class';
import { NavyLeader } from '../models/navy-leader.class';

export const CharacterRoleUnion = createUnionType({
  name: 'CharacterRoleUnion',
  types: () =>
    [CountryLeader, CorpsCommander, FieldMarshal, NavyLeader] as const,
  resolveType(value) {
    return value.constructor.name;
  },
});
