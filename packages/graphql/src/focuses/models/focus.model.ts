import * as Parser from '@kaiseratlas/parser';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { FocusFilter } from './focus-filter.model';

@ObjectType()
export class Focus extends Parser.Focus {
  static readonly Filter = FocusFilter;

  @Field(() => ID)
  readonly id: string;
  @Field(() => Int)
  readonly x: number;
  @Field(() => Int)
  readonly y: number;
  @Field(() => Int)
  readonly cost: number;
  @Field()
  readonly availableIfCapitulated: boolean;
  @Field()
  readonly cancelIfInvalid: boolean;
  @Field()
  readonly continueIfInvalid: boolean;
}
