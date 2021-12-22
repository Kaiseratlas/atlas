import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from './country-history.model';
import { CountryMilitaryCommander } from './country-military-commander.model';

@Entity('country_field_marshals')
@ObjectType({
  implements: () => [CountryMilitaryCommander],
})
export class CountryFieldMarshal extends CountryMilitaryCommander {
  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly planningSkill: number;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly logisticsSkill: number;

  @ManyToOne(
    () => CountryHistory,
    (countryHistory) => countryHistory.fieldMarshals,
    {
      onDelete: 'CASCADE',
    },
  )
  readonly history: CountryHistory;
}
