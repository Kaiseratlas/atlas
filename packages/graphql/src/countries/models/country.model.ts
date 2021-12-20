import { Field, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from '../entities/country-history.entity';
import { CountryFlag } from '../entities/country-flag.entity';
import { CountryName } from '../entities/country-name';

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
