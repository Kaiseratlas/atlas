import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class Event extends Parser.Event {
  @Field(() => ID)
  readonly id: string;
}
