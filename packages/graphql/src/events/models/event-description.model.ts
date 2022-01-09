import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from './event.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('event_descriptions')
@ObjectType()
export class EventDescription extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly text: string | null;

  @Column({ nullable: true })
  readonly trigger: string | null;

  @ManyToOne(() => Event, (event) => event.descriptions, {
    onDelete: 'CASCADE',
  })
  readonly events: Event;
}
