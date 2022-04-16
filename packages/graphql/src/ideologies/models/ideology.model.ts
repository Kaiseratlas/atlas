import { Field, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class Ideology extends Parser.Ideology {
  @Field()
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => Parser.Color)
  readonly color: Parser.Color;
  @Field()
  readonly grouping: string;
  @Field()
  readonly description: string;
  @Field()
  readonly canBeBoosted: boolean;
  @Field()
  readonly canCollaborate: boolean;
}
