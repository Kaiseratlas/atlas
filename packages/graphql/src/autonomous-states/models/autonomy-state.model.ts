import * as Parser from '@kaiseratlas/parser';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AutonomyState extends Parser.AutonomyState {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly isDefault: boolean;
  @Field()
  readonly isPuppet: boolean;
  @Field()
  readonly useOverlordColor: boolean;
  @Field(() => Int)
  readonly minFreedomLevel: number;
  @Field(() => Int)
  readonly peaceConferenceInitialFreedom: number;
  @Field(() => Int)
  readonly manpowerInfluence: number;
}
