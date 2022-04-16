import { Field, Int, ObjectType } from '@nestjs/graphql';
import Parser from '@kaiseratlas/parser';

@ObjectType()
export abstract class Commander {
  @Field(() => Int)
  readonly skill: number;
  @Field(() => Int)
  readonly attackSkill: number;
  @Field(() => Int)
  readonly defenseSkill: number;
}
