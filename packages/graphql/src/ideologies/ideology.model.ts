import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Ideology {
  @Field()
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly grouping: string;
  @Field()
  readonly description: string;
  @Field()
  readonly canBeBoosted: boolean;
  @Field()
  readonly canCollaborate: boolean;
}
