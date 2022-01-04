import { BaseEntity } from '../../shared/models/base-entity.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StateHistory } from './state-history.model';

@Entity('state_cores')
export class StateCore extends BaseEntity {
  @Column()
  readonly tag: string;

  @ManyToOne(() => StateHistory, (stateHistory) => stateHistory.addCoreOf, {
    onDelete: 'CASCADE',
  })
  readonly history: StateHistory;
}
