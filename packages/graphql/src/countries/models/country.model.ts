import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from './country-history.model';
import { CountryFlag } from './country-flag.model';
import { CountryName } from './country-name.model';

@ObjectType()
export class Country {
  @Field(() => ID)
  readonly tag: string;

  @Field()
  readonly color: string;

  @Field()
  readonly colorUi: string;

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
