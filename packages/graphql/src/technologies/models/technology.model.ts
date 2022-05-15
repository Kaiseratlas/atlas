import * as Parser from '@kaiseratlas/parser';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { TechnologyCategory } from './technology-category.model';

@ObjectType()
export class Technology extends Parser.Technology {
  static readonly Category = TechnologyCategory;

  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly isDoctrine: boolean;
  @Field(() => Float)
  readonly researchCost: number;
  @Field(() => Int, { nullable: true })
  readonly startYear: number;
  @Field()
  readonly showEffectAsDescription: boolean;
}
