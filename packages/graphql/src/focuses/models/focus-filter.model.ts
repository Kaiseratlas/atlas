import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FocusFilter extends Parser.Focus.Filter {
  @Field(() => ID)
  readonly id: string;
}
