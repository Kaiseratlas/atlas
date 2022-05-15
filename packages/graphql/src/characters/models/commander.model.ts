import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType({ isAbstract: true })
export abstract class Commander extends Parser.Commander {
  @Field(() => Int)
  readonly skill: number;
  @Field(() => Int)
  readonly attackSkill: number;
  @Field(() => Int)
  readonly defenseSkill: number;
}
