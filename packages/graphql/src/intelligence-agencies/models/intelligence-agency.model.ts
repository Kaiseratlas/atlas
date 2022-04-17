import * as Parser from '@kaiseratlas/parser';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IntelligenceAgency extends Parser.IntelligenceAgency {
  @Field(() => [String])
  readonly names: string[];
}
