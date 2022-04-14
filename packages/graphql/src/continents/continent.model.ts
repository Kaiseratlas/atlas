import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Continent {
  @Field(() => ID)
  readonly id: number;
}
