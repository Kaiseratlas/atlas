import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Release {
  @Field()
  readonly version: string;
}
