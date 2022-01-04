import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly path: string;

  @Field()
  readonly name: string;
}
