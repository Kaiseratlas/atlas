import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Country {
  @Field()
  tag: string;

  @Field()
  name: string;

  @Field()
  flagUrl: string;
}
