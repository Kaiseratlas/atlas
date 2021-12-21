import { Field, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from './country-history.model';
import { CountryFlag } from './country-flag.model';
import { CountryName } from './country-name.model';

@ObjectType()
export class Country {
  @Field()
  readonly tag: string;

  @Field()
  readonly name: string;

  @Field(() => [CountryFlag])
  readonly flags: CountryFlag[];

  @Field(() => [CountryName])
  readonly names: CountryName[];

  @Field()
  readonly localizedDefaultName?: string;

  @Field(() => CountryHistory)
  readonly history?: CountryHistory;

  @Field()
  readonly flagUrl: string;
}
