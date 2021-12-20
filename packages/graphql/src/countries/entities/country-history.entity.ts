import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';
import { Field, ID, Int, Float, ObjectType } from '@nestjs/graphql';
import { State } from '../../states/models/state.model';
import { CountryPolitics } from './country-politics';

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

  @Field(() => State)
  readonly capital?: State;

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

  @ManyToOne(() => Mod, (mod) => mod.countryHistory, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
