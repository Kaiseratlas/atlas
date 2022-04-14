import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProvinceType, Color, Province as _Province } from '@kaiseratlas/parser';

registerEnumType(ProvinceType, {
  name: 'ProvinceType',
});

@ObjectType()
export class Province extends _Province {
  @Field(() => ID)
  readonly id: number;
  @Field(() => Color)
  readonly color: Color;
  @Field(() => ProvinceType)
  readonly type: ProvinceType;
  @Field()
  readonly isCoastal: boolean;
}
