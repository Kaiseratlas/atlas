import { Field, ObjectType } from '@nestjs/graphql';
import { Ideology } from '../../ideologies/models/ideology.model';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class CountryLeader extends Parser.CountryLeader {
  // @Field(() => Ideology)
  // readonly ideology: Ideology;
  @Field({ nullable: true })
  readonly description: string;
}
