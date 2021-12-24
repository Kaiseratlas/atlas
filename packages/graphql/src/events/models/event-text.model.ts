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

@Entity('event_texts')
@ObjectType()
export class EventText {
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
  @ManyToOne(() => Event, (event) => event.titles, {
    onDelete: 'CASCADE',
  })
  readonly event: Event;
}
