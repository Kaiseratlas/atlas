import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Commander } from './commander.model';

@ObjectType()
export class CorpsCommander extends Commander {
  @Field(() => Int)
  readonly planningSkill: number;
  @Field(() => Int)
  readonly logisticsSkill: number;
}
