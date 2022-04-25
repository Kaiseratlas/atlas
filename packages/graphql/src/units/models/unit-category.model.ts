import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UnitCategory extends Parser.Unit.Category {
  @Field(() => ID)
  readonly id: string;
}
