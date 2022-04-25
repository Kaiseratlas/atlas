import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UnitGroup extends Parser.Unit.Group {
  @Field(() => ID)
  readonly id: string;
}
