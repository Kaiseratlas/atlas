import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => ID)
  readonly id: string;
}
