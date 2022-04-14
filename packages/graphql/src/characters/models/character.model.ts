import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field(() => ID)
  readonly id: string;
}
