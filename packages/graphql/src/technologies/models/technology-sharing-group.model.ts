import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class TechnologySharingGroup extends Parser.Technology.SharingGroup {
  @Field(() => ID)
  readonly id: string;
  @Field(() => Float)
  readonly researchSharingPerCountryBonus: number;
}
