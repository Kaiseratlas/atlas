import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class CountryFlag extends Parser.CountryFlag {
  @Field(() => ID)
  readonly id: string;
}
