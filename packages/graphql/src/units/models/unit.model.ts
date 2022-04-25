import * as Parser from '@kaiseratlas/parser';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { UnitCategory } from './unit-category.model';
import { Equipment } from './equipment.model';
import { UnitGroup } from './unit-group.model';

@ObjectType()
export class Unit extends Parser.Unit {
  static readonly Group = UnitGroup;
  static readonly Equipment = Equipment;
  static readonly Category = UnitCategory;

  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true })
  readonly abbreviation: string;
  @Field(() => Unit.Group, { nullable: true })
  readonly group: UnitGroup;
  @Field()
  readonly priority: number;
  @Field(() => Int, { nullable: true })
  readonly aiPriority: number;
  @Field()
  readonly active: boolean;
  @Field(() => Int)
  readonly combatWidth: number;
  @Field(() => Float, { nullable: true })
  readonly maxStrength: number;
  @Field(() => Int)
  readonly maxOrganisation: number;
  @Field(() => Float, { nullable: true })
  readonly defaultMorale: number;
  @Field(() => Int)
  readonly manpower: number;
  @Field(() => Int, { nullable: true })
  readonly trainingTime: number;
  @Field(() => Float, { nullable: true })
  readonly suppression: number;
  @Field(() => Float, { nullable: true })
  readonly weight: number;
  @Field(() => Float)
  readonly supplyConsumption: number;
}
