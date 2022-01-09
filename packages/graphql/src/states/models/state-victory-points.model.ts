import { BaseEntity } from '../../shared/models/base-entity.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StateHistory } from './state-history.model';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@Entity('state_victory_points')
@ObjectType()
export class StateVictoryPoints extends BaseEntity {
  @Column('numeric')
  @Field(() => ID)
  readonly provinceId: number;

  @Field(() => ID)
  readonly name: string;

  @Column('numeric')
  @Field(() => Int)
  readonly value: number;

  @ManyToOne(() => StateHistory, (stateHistory) => stateHistory.victoryPoints, {
    onDelete: 'CASCADE',
  })
  readonly history: StateHistory;
}
