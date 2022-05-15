import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Commander } from './commander.model';

@ObjectType()
export class NavyLeader extends Commander {
  @Field(() => Int)
  readonly maneuveringSkill: number;
  @Field(() => Int)
  readonly coordinationSkill: number;
}
