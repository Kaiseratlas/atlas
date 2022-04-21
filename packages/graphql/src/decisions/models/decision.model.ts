import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Decision extends Parser.Decision {
  @Field(() => ID)
  readonly id: string;
}
