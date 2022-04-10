import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Country {
  @Field(() => ID)
  tag: string;
}
