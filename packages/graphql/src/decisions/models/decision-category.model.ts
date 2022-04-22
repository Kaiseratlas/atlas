import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DecisionCategory extends Parser.Decision.Category {
  @Field(() => ID)
  readonly id: string;
}
