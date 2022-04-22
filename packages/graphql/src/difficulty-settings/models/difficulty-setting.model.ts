import * as Parser from '@kaiseratlas/parser';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DifficultySetting extends Parser.DifficultySetting {
  @Field(() => ID)
  readonly key: string;
  @Field(() => Float)
  readonly multiplier: number;
}
