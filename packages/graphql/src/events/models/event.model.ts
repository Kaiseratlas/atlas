import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { EventType } from '../enums/event-type.enum';
import { EventOption } from './event-option.model';
import { EventDescription } from './event-description.model';
import { EventTitle } from './event-title.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('events')
@ObjectType()
export class Event extends BaseEntity {
  static readonly Type = EventType;

  @Field(() => ID, {
    name: 'id',
    description: 'A unique identifier for the event.',
  })
  @Expose({ name: 'id', groups: ['parsing'] })
  @Column()
  readonly eventId: string;

  @Field(() => EventType)
  @Column({ enum: EventType, enumName: 'event_type' })
  readonly type: EventType;

  @OneToMany(() => EventTitle, (eventTitle) => eventTitle.events, {
    cascade: true,
    eager: true,
  })
  @Field(() => [EventTitle], {
    description: "A plain localization key for the event's title",
    nullable: true,
  })
  readonly titles: EventTitle[];

  @OneToMany(
    () => EventDescription,
    (eventDescription) => eventDescription.events,
    {
      cascade: true,
      eager: true,
    },
  )
  @Field(() => [EventDescription], {
    description: "Defines the event's description text.",
    nullable: true,
  })
  @Expose({ name: 'desc', groups: ['parsing'] })
  readonly descriptions: EventDescription[];

  @Column({ nullable: true })
  readonly picture: string | null;

  @Field(() => Boolean, {
    description: 'If false, the event can fire multiple times.',
  })
  @Expose({ name: 'fire_only_once', groups: ['parsing'] })
  @Column({ type: 'boolean', default: false })
  readonly fireOnlyOnce: boolean;

  @Field(() => Boolean, {
    description:
      "If true, the event cannot randomly happen through 'mean_time_to_happen', it must be triggered explicitly in an effect. Also, if set to no, the event can not happen through a trigger",
  })
  @Expose({ name: 'is_triggered_only', groups: ['parsing'] })
  @Column({ type: 'boolean', default: false })
  readonly isTriggeredOnly: boolean;

  @Field(() => Int, {
    description:
      'Number of days for the recipient to respond. After the timeout, the first option gets selected.',
  })
  @Expose({ name: 'timeout_days', groups: ['parsing'] })
  @Column({ type: 'numeric', nullable: true })
  readonly timeoutDays: number; // default: 13

  @Field(() => Boolean, {
    description:
      'If false, the event will not be shown to the sending country, even if it is a major event.',
  })
  @Expose({ name: 'fire_for_sender', groups: ['parsing'] })
  @Column({ type: 'boolean', default: true })
  readonly fireForSender: boolean;

  @Field(() => Boolean, {
    description:
      'The event will not be shown but can still cause other side effects, like triggering different events.',
  })
  @Column({ type: 'boolean', default: false })
  readonly hidden: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  readonly exclusive: boolean;

  @Field(() => Boolean, {
    description: 'If true, the event will be shown to all countries.',
  })
  @Column({ type: 'boolean', default: false })
  readonly major: boolean;

  @OneToMany(() => EventOption, (eventOption) => eventOption.event, {
    cascade: true,
    eager: true,
  })
  @Field(() => [EventOption])
  readonly options: EventOption[];

  @ManyToOne(() => Mod, (mod) => mod.events, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
