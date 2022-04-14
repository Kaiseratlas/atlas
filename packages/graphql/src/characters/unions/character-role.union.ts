import { createUnionType } from '@nestjs/graphql';
import { CountryLeader } from '../models/country-leader.model';
import { FieldMarshal } from '../models/field-marshal.class';

export const CharacterRole = createUnionType({
  name: 'CharacterRole',
  types: () => [CountryLeader, FieldMarshal] as const,
});
