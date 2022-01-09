import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { Field, ID, Int, Float, ObjectType } from '@nestjs/graphql';
import { CountryPolitics } from './country-politics.model';
import { CountryLeader } from './country-leader.model';
import { CountryPopularity } from './country-popularity.model';
import { CountryFieldMarshal } from './country-field-marshal.model';
import { CountryCorpsCommander } from './country-corps-commander.model';
import { CountryNavyLeader } from './country-navy-leader.model';
import { CountryIdea } from './country-idea.model';
import { Idea } from '../../ideas/models/idea.model';
import { CountryEvent } from './country-event.model';
import { StateVictoryPoints } from '../../states/models';

@ObjectType()
@Entity('country_history')
export class CountryHistory {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly tag: string;

  @Column('numeric')
  @Field(() => ID)
  readonly capitalId: number;

  @Field(() => StateVictoryPoints)
  readonly capital?: StateVictoryPoints;

  @Field(() => Int)
  @Column('numeric', { default: 0 })
  readonly researchSlots: number;

  @Field(() => Float)
  @Column('numeric', { default: 0 })
  readonly stability: number;

  @Field(() => Float)
  @Column('numeric', { default: 0 })
  readonly warSupport: number;

  @Field(() => Int)
  @Column('numeric', { default: 0 })
  readonly politicalPower: number;

  @Field(() => Int)
  @Column('numeric', { default: 0 })
  readonly convoys: number;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @OneToOne(() => CountryPolitics, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @Field(() => CountryPolitics)
  readonly politics: CountryPolitics;

  @OneToMany(() => CountryLeader, (countryLeader) => countryLeader.history, {
    cascade: true,
    lazy: true,
  })
  @Field(() => [CountryLeader])
  readonly leaders: CountryLeader[];

  @OneToMany(
    () => CountryPopularity,
    (countryPopularity) => countryPopularity.history,
    {
      cascade: true,
      lazy: true,
    },
  )
  @Field(() => [CountryPopularity])
  readonly popularities: CountryPopularity[];

  @OneToMany(
    () => CountryFieldMarshal,
    (countryFieldMarshal) => countryFieldMarshal.history,
    {
      cascade: true,
      lazy: true,
    },
  )
  @Field(() => [CountryFieldMarshal])
  readonly fieldMarshals: CountryFieldMarshal[];

  @OneToMany(
    () => CountryCorpsCommander,
    (countryCorpsCommander) => countryCorpsCommander.history,
    {
      cascade: true,
      lazy: true,
    },
  )
  @Field(() => [CountryCorpsCommander])
  readonly corpsCommanders: CountryCorpsCommander[];

  @OneToMany(
    () => CountryNavyLeader,
    (countryNavyLeader) => countryNavyLeader.history,
    {
      cascade: true,
      lazy: true,
    },
  )
  @Field(() => [CountryNavyLeader])
  readonly navyLeaders: CountryNavyLeader[];

  @OneToMany(() => CountryIdea, (countryIdea) => countryIdea.history, {
    cascade: true,
    lazy: true,
  })
  @Field(() => [Idea])
  readonly ideas: CountryIdea[] | Idea[];

  @OneToMany(() => CountryEvent, (countryEvent) => countryEvent.history, {
    cascade: true,
    lazy: true,
  })
  @Field(() => [CountryEvent])
  readonly events: CountryEvent[];

  @ManyToOne(() => Mod, (mod) => mod.countryHistory, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
