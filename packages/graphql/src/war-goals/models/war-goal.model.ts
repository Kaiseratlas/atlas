import * as Parser from '@kaiseratlas/parser';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WarGoal extends Parser.WarGoal {
  @Field(() => ID)
  readonly id: string;
  @Field(() => Int)
  readonly generateBaseCost: number;
  @Field(() => Int)
  readonly generatePerStateCost: number;
  @Field(() => Int)
  readonly takeStatesLimit: number;
  @Field(() => Int)
  readonly takeStatesCost: number;
  @Field(() => Int)
  readonly expire: number;
  @Field(() => Float)
  readonly threat: number;
}
