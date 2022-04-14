import { Field, ObjectType } from '@nestjs/graphql';
import { Ideology } from '../../ideologies/ideology.model';

@ObjectType()
export class CountryLeader {
  @Field(() => Ideology)
  readonly ideology: Ideology;
  @Field({ nullable: true })
  readonly description: string;
}
