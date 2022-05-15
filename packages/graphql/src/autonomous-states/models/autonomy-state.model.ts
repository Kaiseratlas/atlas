import * as Parser from '@kaiseratlas/parser';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

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
  @Field(() => Float)
  readonly minFreedomLevel: number;
  @Field(() => Float)
  readonly peaceConferenceInitialFreedom: number;
  @Field(() => Float)
  readonly manpowerInfluence: number;
}
