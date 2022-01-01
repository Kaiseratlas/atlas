import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from './event.model';

@Entity('event_descriptions')
@ObjectType()
export class EventDescription {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly text: string | null;

  @Column({ nullable: true })
  readonly trigger: string | null;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Event, (event) => event.descriptions, {
    onDelete: 'CASCADE',
  })
  readonly events: Event;
}
