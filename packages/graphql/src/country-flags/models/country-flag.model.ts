import { Field, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class CountryFlag extends Parser.CountryFlag {
  @Field({ nullable: true })
  readonly variant: string;
}
