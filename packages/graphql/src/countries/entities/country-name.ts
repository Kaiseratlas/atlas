import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountryName {
  @Field()
  readonly localizedName: string;

  @Field()
  readonly variant: string;
}
