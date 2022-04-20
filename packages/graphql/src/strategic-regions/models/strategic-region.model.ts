import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class StrategicRegion extends Parser.StrategicRegion {
  @Field(() => ID)
  readonly id: number;
}
