import { Field, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class CountryLeader extends Parser.CountryLeader {
  @Field({ nullable: true })
  readonly description: string;
}
