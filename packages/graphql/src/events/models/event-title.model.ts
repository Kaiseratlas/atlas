import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from './event.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('event_titles')
@ObjectType()
export class EventTitle extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly text: string | null;

  @Column({ nullable: true })
  readonly trigger: string | null;

  @ManyToOne(() => Event, (event) => event.titles, {
    onDelete: 'CASCADE',
  })
  readonly events: Event;
}
