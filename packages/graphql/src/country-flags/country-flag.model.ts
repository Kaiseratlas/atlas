import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountryFlag {
  @Field({ nullable: true })
  readonly variant: string;
}
