import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class State {
  @Field(() => ID)
  readonly id: number;
  @Field(() => Int)
  readonly manpower = 0;
  @Field()
  readonly impassable: boolean;
  @Field(() => Int, { nullable: true })
  readonly buildingsMaxLevelFactor: number = null;
}

