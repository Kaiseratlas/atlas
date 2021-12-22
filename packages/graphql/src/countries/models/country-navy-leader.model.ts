import { Column, Entity, ManyToOne } from 'typeorm';
import { CountryHistory } from './country-history.model';
import { CountryMilitaryCommander } from './country-military-commander.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('country_navy_leaders')
@ObjectType({
  implements: () => [CountryMilitaryCommander],
})
export class CountryNavyLeader extends CountryMilitaryCommander {
  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly maneuveringSkill: number;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly coordinationSkill: number;

  @ManyToOne(
    () => CountryHistory,
    (countryHistory) => countryHistory.navyLeaders,
    {
      onDelete: 'CASCADE',
    },
  )
  readonly history: CountryHistory;
}
