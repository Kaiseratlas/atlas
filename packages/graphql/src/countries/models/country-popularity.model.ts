import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from './country-history.model';
import { Ideology } from '../../ideologies/models/ideology.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@ObjectType()
@Entity('country_popularities')
export class CountryPopularity extends BaseEntity {
  @Column()
  readonly ideologyName: string;

  @Field(() => Ideology)
  readonly ideology: Ideology;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly value: number;

  @ManyToOne(
    () => CountryHistory,
    (countryHistory) => countryHistory.popularities,
    {
      onDelete: 'CASCADE',
    },
  )
  readonly history: CountryHistory;
}
