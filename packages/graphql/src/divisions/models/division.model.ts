import * as Parser from '@kaiseratlas/parser';
import { DivisionTemplate } from './division-template.model';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Division extends Parser.Division {
  static readonly Template = DivisionTemplate;
  @Field(() => Float)
  readonly startExperienceFactor: number;
  @Field(() => Float)
  readonly startEquipmentFactor: number;
}
