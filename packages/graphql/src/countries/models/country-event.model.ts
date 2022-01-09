import { Column, Entity, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { CountryHistory } from './country-history.model';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Event } from '../../events/models';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('country_events')
@ObjectType()
export class CountryEvent extends BaseEntity {
  @Column()
  @Field(() => ID, { name: 'id' })
  @Expose({ name: 'id', groups: ['parsing'] })
  readonly eventId: string;

  @Field(() => Int)
  @Column({ type: 'numeric', default: 0 })
  readonly hours: number;

  @Field(() => Int)
  @Column({ type: 'numeric', default: 0 })
  readonly days: number;

  @Field(() => Int)
  @Column({ type: 'numeric', default: 0 })
  readonly months: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'numeric', default: 0 })
  @Expose({ name: 'random_days', groups: ['parsing'] })
  readonly randomDays: number;

  @Field(() => Event)
  readonly event: Event;

  @ManyToOne(() => CountryHistory, (countryHistory) => countryHistory.events, {
    onDelete: 'CASCADE',
  })
  readonly history: CountryHistory;
}
