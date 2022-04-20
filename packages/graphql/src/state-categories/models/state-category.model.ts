import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class StateCategory extends Parser.StateCategory {
  @Field(() => ID)
  readonly id: string;
}
