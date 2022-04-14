import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { State as _State } from '@kaiseratlas/parser';

@ObjectType()
export class State extends _State {
  @Field(() => ID)
  readonly id: number;
  @Field(() => Int)
  readonly manpower: number;
  @Field()
  readonly impassable: boolean;
  @Field(() => Int, { nullable: true })
  readonly buildingsMaxLevelFactor: number = null;
}
