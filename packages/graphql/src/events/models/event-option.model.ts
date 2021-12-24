import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.model';
import { Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('event_options')
@ObjectType()
export class EventOption {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: true })
  @Field({ description: "The localization key of the option's name." })
  readonly name: string | null;

  @Field(() => Boolean, {
    description:
      'For major events, this option is only available to the direct recipient.',
  })
  @Column({ type: 'boolean', default: false })
  @Expose({ name: 'original_recipient_only', groups: ['parsing'] })
  readonly originalRecipientOnly: boolean;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Event, (event) => event.options, {
    onDelete: 'CASCADE',
  })
  readonly event: Event;
}
