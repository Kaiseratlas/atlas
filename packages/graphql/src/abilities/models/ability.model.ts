import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ability extends Parser.Ability {
  @Field(() => ID)
  readonly id: string;
}
