import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CountryHistory } from './country-history.model';
import { Ideology } from '../../ideologies/models/ideology.model';

@ObjectType()
@Entity('country_popularities')
export class CountryPopularity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly ideologyName: string;

  @Field(() => Ideology)
  readonly ideology: Ideology;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly value: number;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(
    () => CountryHistory,
    (countryHistory) => countryHistory.popularities,
    {
      onDelete: 'CASCADE',
    },
  )
  readonly history: CountryHistory;
}
