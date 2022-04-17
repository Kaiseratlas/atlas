import * as Parser from '@kaiseratlas/parser';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Resource extends Parser.Resource {
  @Field(() => ID)
  readonly id: string;
  @Field(() => Float)
  readonly CIC: number;
  @Field(() => Float)
  readonly convoys: number;
}
