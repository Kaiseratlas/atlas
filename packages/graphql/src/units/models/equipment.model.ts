import * as Parser from '@kaiseratlas/parser';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Equipment extends Parser.Unit.Equipment {
  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true })
  readonly year?: number;
  @Field()
  readonly isArchetype: boolean;
  @Field()
  readonly isBuildable: boolean;
  @Field({ nullable: true })
  readonly active: boolean;
}
