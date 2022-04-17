import * as Parser from '@kaiseratlas/parser';
import { Color } from '@kaiseratlas/parser';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TerrainCategory extends Parser.TerrainCategory {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly isWater: boolean;
  @Field(() => Color)
  readonly color: Color;
  @Field(() => Float)
  readonly movementCost: number;
  @Field(() => Int)
  readonly combatWidth: number;
  @Field(() => Int)
  readonly combatSupportWidth: number;
  @Field(() => Float, { nullable: true })
  readonly aiTerrainImportanceFactor: number;
  @Field(() => Float)
  readonly matchValue: number;
  @Field({ nullable: true })
  readonly soundType: string;
  @Field(() => Float)
  readonly enemyArmyBonusAirSuperiorityFactor: number;
  @Field(() => Float)
  readonly supplyFlowPenaltyFactor: number;
  @Field(() => Float)
  readonly truckAttritionFactor: number;
}
