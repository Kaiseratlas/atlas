import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from './country-history.model';
import { CountryMilitaryCommander } from './country-military-commander.model';

@Entity('country_corps_commanders')
@ObjectType({
  implements: () => [CountryMilitaryCommander],
})
export class CountryCorpsCommander extends CountryMilitaryCommander {
  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly planningSkill: number;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly logisticsSkill: number;

  @ManyToOne(
    () => CountryHistory,
    (countryHistory) => countryHistory.corpsCommanders,
    {
      onDelete: 'CASCADE',
    },
  )
  readonly history: CountryHistory;
}
