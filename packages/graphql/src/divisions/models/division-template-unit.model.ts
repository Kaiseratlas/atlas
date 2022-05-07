import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class DivisionTemplateUnit extends Parser.Division.Template.Unit {
  @Field(() => Int)
  readonly x: number;
  @Field(() => Int)
  readonly y: number;
}
