import * as Parser from '@kaiseratlas/parser';
import { Field, ID, Int, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Building extends Parser.Building {
  @Field(() => ID)
  readonly id: string;
  @Field(() => Int)
  readonly baseCost: number;
  @Field(() => Int, { nullable: true })
  readonly baseCostConversion: number;
  @Field(() => Int, { nullable: true })
  readonly perLevelExtraCost: number;
  @Field(() => Int, { nullable: true })
  readonly maxLevel: number;
  @Field(() => Int)
  readonly value: number;
  @Field(() => Int)
  readonly iconFrame: number;
  @Field(() => Int, { nullable: true })
  readonly showOnMap: number;
  @Field(() => Int, { nullable: true })
  readonly showOnMapMeshes: number;
  @Field()
  readonly isAlwaysShown: boolean;
  @Field()
  readonly hasDestroyedMesh: boolean;
  @Field()
  readonly hasSharesSlots: boolean;
  @Field()
  readonly hasInfrastructureConstructionEffect: boolean;
  @Field()
  readonly isProvincial: boolean;
  @Field(() => Float)
  readonly damageFactor: number;
  @Field()
  readonly isOnlyCoastal: boolean;
  @Field()
  readonly isDisabledInDMZ: boolean;
  @Field()
  readonly isInfrastructure: boolean;
  @Field()
  readonly isAirBase: boolean;
  @Field()
  readonly isPort: boolean;
  @Field()
  readonly isAntiAir: boolean;
  @Field()
  readonly isRefinery: boolean;
  @Field()
  readonly isRadar: boolean;
  @Field()
  readonly isNuclearReactor: boolean;
  @Field(() => Int)
  readonly militaryProduction: number;
  @Field(() => Int)
  readonly generalProduction: number;
  @Field(() => Int)
  readonly navalProduction: number;
  @Field(() => Int)
  readonly landFort: number;
  @Field(() => Int)
  readonly navalFort: number;
  @Field(() => Int)
  readonly rocketProduction: number;
  @Field(() => Int)
  readonly rocketLaunchCapacity: number;
}