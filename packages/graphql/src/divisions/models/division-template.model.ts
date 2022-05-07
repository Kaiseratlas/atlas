import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DivisionTemplateUnit } from './division-template-unit.model';

@ObjectType()
export class DivisionTemplate extends Parser.Division.Template {
  static readonly Unit = DivisionTemplateUnit;

  @Field(() => ID, { name: 'name' })
  readonly id: string;
  @Field(() => [DivisionTemplateUnit])
  readonly regiments: DivisionTemplateUnit[];
  @Field(() => [DivisionTemplateUnit])
  readonly support: DivisionTemplateUnit[];
}
