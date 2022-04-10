import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StateCategory {
  @Field(() => ID)
  readonly id: string;
}
