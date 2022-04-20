import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FocusTree extends Parser.FocusTree {
  @Field(() => ID)
  readonly id: string;
}
