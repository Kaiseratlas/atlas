import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class TechnologyCategory extends Parser.Technology.Category {
  @Field(() => ID)
  readonly id: string;
}
